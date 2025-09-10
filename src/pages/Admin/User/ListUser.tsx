import { Fragment, useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { deleteUser, getListUser } from "~/redux/features/auth/actions";

import {
  Add,
  Cancel,
  CheckCircle,
  Delete,
  Edit,
  Search,
  Visibility,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import RowUserSkeleton from "~/components/common/Skeleton/User/RowUser";
import {
  filterRoleOptions,
  filterStatusOptions,
  sortUserOptions,
} from "~/constants";
import { useAppSelector } from "~/hooks/useAppSelector";
import { useDebounce } from "~/hooks/useDebounce";
import type {
  SortByValue,
  SortOption,
} from "~/redux/features/restaurant/initialState";
import DeleteUserModal from "~/components/modals/DeleteUser";
import { toast } from "sonner";

export default function ListUser() {
  const dispatch = useAppDispatch();
  const { users, loading, pagination } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  // filter & sort state
  const [search, setSearch] = useState<string>("");
  const [role, setRole] = useState<number | undefined>(undefined);
  const [status, setStatus] = useState<number | undefined>(undefined);
  const [sort, setSort] = useState<SortOption>(
    sortUserOptions[0] as SortOption,
  );
  const searchDebounce = useDebounce(search, 300);
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const handleChangePage = (page: number) => {
    setPage(page);
  };
  const handleChangeRole = (e: SelectChangeEvent) => {
    setRole(+e.target.value);
  };

  const handleChangeStatus = (e: SelectChangeEvent) => {
    setStatus(+e.target.value);
  };

  const handleSort = (e: SelectChangeEvent) => {
    const option = sortUserOptions.find(
      (o) => `${o.value}_${o.order}` === e.target.value,
    );
    if (option) {
      setSort({
        label: option.label,
        value: option.value as SortByValue,
        order: option.order as "asc" | "desc",
      });
    }
    setPage(1);
  };
  const handleDeleteUser = async () => {
    try {
      const result = await deleteUser(selectedUserId!);
      if (result) {
        toast.success("Xoá người dùng thành công");
        setOpen(false);
        setSelectedUserId(null);
        handleGetListUser();
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Xoá người dùng thất bại");
    }
  };

  const handleGetListUser = useCallback(() => {
    dispatch(
      getListUser({
        search: searchDebounce || undefined,
        page,
        limit: 10,
        sortBy: sort.value,
        sortOrder: sort.order,
        role: role || undefined,
        is_active: status || undefined,
      }),
    );
  }, [dispatch, searchDebounce, page, sort.value, sort.order, role, status]);

  useEffect(() => {
    handleGetListUser();
  }, [handleGetListUser]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Bộ lọc */}
      <Grid container spacing={2} mb={3} alignItems="center">
        <Grid size={{ xs: 12, md: 10 }}>
          <Grid container spacing={2} alignItems="center">
            {/* Ô tìm kiếm */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                placeholder="Tìm kiếm người dùng..."
                size="small"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Lọc vai trò */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <FormControl fullWidth size="small">
                <Select<string>
                  value={role !== undefined ? String(role) : ""}
                  onChange={handleChangeRole}
                  displayEmpty
                >
                  {filterRoleOptions.map((o) => (
                    <MenuItem key={o.value} value={o.value}>
                      {o.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Lọc trạng thái */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <FormControl fullWidth size="small">
                <Select<string>
                  value={status !== undefined ? String(status) : ""}
                  onChange={handleChangeStatus}
                  displayEmpty
                >
                  {filterStatusOptions.map((o) => (
                    <MenuItem key={o.value} value={String(o.value)}>
                      {o.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Sắp xếp */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <FormControl fullWidth size="small">
                <Select
                  value={sort ? `${sort.value}_${sort.order}` : ""}
                  onChange={(e) => handleSort(e)}
                >
                  {sortUserOptions.map((o) => (
                    <MenuItem
                      key={`${o.value}_${o.order}`}
                      value={`${o.value}_${o.order}`}
                    >
                      {o.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Button
          onClick={() => navigate("/admin/users/create")}
          startIcon={<Add />}
          variant="contained"
          sx={{ ml: "auto" }}
        >
          Thêm người dùng
        </Button>
      </Grid>

      {/* Danh sách người dùng */}
      <Box
        sx={{
          border: "1px solid #eee",
          borderRadius: 2,
          p: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Danh sách người dùng
        </Typography>
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Người dùng</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Vai trò</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <Fragment key={i}>
                    <RowUserSkeleton />
                  </Fragment>
                ))
              ) : !users.length ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="body2" sx={{ py: 3 }}>
                      Không có người dùng nào
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((u) => (
                  <TableRow key={u._id}>
                    <TableCell>
                      <Link to={`/admin/users/${u._id}`}>
                        <Typography variant="body2" color="primary">
                          {u._id}
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Typography component={"p"}>{u.name}</Typography>
                      <Typography component={"p"}>{u?.username}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{u.email}</Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        {u.verify ? (
                          <>
                            <CheckCircle color="success" fontSize="small" />
                            <Typography variant="body2" color="success.main">
                              Đã xác minh
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Cancel color="error" fontSize="small" />
                            <Typography variant="body2" color="error.main">
                              Chưa xác minh
                            </Typography>
                          </>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={u?.role?.role_name || "Người dùng"}
                        color="primary"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {u.is_active ? (
                        <Chip label="Hoạt động" color="success" size="small" />
                      ) : (
                        <Chip
                          label="Không hoạt động"
                          color="default"
                          size="small"
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      {format(new Date(u.created_at), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell
                      sx={{ display: "flex", gap: 1, py: 3, height: "100%" }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/admin/users/${u._id}`)}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/admin/users/${u._id}/edit`)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setOpen(true);
                          setSelectedUserId(u._id);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {!!users.length && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="body2">
              Hiển thị 1 đến {pagination.limit} trong tổng số {pagination.total}{" "}
              kết quả
            </Typography>
            <Pagination
              count={Math.ceil(pagination.total / pagination.limit)}
              page={page}
              onChange={(_event, value) => handleChangePage(value)}
              siblingCount={1}
              boundaryCount={1}
              shape="rounded"
              variant="outlined"
            />
          </Box>
        )}
      </Box>
      <DeleteUserModal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedUserId(null);
        }}
        onConfirm={handleDeleteUser}
      />
    </Box>
  );
}
