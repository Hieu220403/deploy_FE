import { Delete, Edit, Search, Visibility } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Pagination,
  Paper,
  Rating,
  Select,
  Skeleton,
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
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sortRestaurantOptions } from "~/constants";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { useAppSelector } from "~/hooks/useAppSelector";
import { useDebounce } from "~/hooks/useDebounce";
import { getRestaurants, setPage } from "~/redux/features/restaurant/actions";
import type {
  SortByValue,
  SortOption,
} from "~/redux/features/restaurant/initialState";

export default function DanhSachNhaHang() {
  const dispatch = useAppDispatch();
  const { restaurants, pagination, loading } = useAppSelector(
    (state) => state.restaurant,
  );
  const navigate = useNavigate();
  const [rating, setRating] = useState<number | null>(0);
  const [sort, setSort] = useState<SortOption>(
    sortRestaurantOptions[0] as SortOption,
  );
  const [search, setSearch] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search, 300);

  const handleGetListRestaurant = useCallback(async () => {
    dispatch(
      getRestaurants({
        page: pagination.page,
        limit: pagination.limit,
        search: debouncedSearch || undefined,
        sortBy: sort?.value,
        sortOrder: sort?.order,
        rating: rating || undefined,
      }),
    );
  }, [
    dispatch,
    pagination.page,
    pagination.limit,
    debouncedSearch,
    sort,
    rating,
  ]);

  const handleChangePage = (page: number) => {
    dispatch(setPage(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSort = (e: SelectChangeEvent) => {
    const option = sortRestaurantOptions.find(
      (o) => `${o.value}_${o.order}` === e.target.value,
    );
    if (option) {
      setSort({
        label: option.label,
        value: option.value as SortByValue,
        order: option.order as "asc" | "desc",
      });
    }
  };

  const handleXoaBoLoc = () => {
    setRating(0);
    setSort(sortRestaurantOptions[0] as SortOption);
    setSearch(null);
    dispatch(setPage(1));
  };

  useEffect(() => {
    handleGetListRestaurant();
  }, [sort, debouncedSearch, rating, handleGetListRestaurant]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Quản lý nhà hàng
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quản lý và giám sát danh sách nhà hàng
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: "8px" }}
          onClick={() => navigate("/admin/restaurants/create")}
        >
          + Thêm nhà hàng
        </Button>
      </Box>

      {/* Bộ lọc */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            {/* Ô tìm kiếm */}
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                placeholder="Tìm kiếm nhà hàng..."
                size="small"
                value={search || ""}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Lọc theo đánh giá */}
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth size="small">
                <Select
                  value={rating || ""}
                  onChange={(e) => setRating(Number(e.target.value))}
                  displayEmpty
                >
                  <MenuItem value={0}>Tất cả đánh giá</MenuItem>
                  {[5, 4, 3, 2, 1].map((r) => (
                    <MenuItem key={r} value={r}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Rating size="small" value={r} readOnly />
                        <Typography variant="body2">{r} sao</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Sắp xếp */}
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth size="small">
                <Select
                  value={sort ? `${sort.value}_${sort.order}` : ""}
                  onChange={(e) => handleSort(e)}
                >
                  {sortRestaurantOptions.map((o) => (
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

            {/* Xóa bộ lọc */}
            <Grid size={{ xs: 12, md: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                color="secondary"
                onClick={handleXoaBoLoc}
              >
                Xóa bộ lọc
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Bảng danh sách */}
      <Card>
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nhà hàng</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Đánh giá</TableCell>
                <TableCell>Đánh giá</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton variant="text" width="80%" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : restaurants.length ? (
                restaurants.map((r) => (
                  <TableRow key={r._id}>
                    <TableCell>
                      <Typography fontWeight="500">{r.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        ID: {r._id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{r.address}</Typography>
                    </TableCell>
                    <TableCell>{r.phone_number}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <Typography variant="body2">{r.rating}</Typography>
                        <StarIcon fontSize="small" color="warning" />
                      </Box>
                    </TableCell>
                    <TableCell>{r.total_reviews || 0} đánh giá</TableCell>
                    <TableCell>
                      {format(new Date(r.created_at), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                      <IconButton size="small">
                        <Edit />
                      </IconButton>
                      <IconButton size="small">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="body2" sx={{ py: 3 }}>
                      Không có nhà hàng nào
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Phân trang */}
      {!loading && restaurants.length > 0 && (
        <Box display="flex" justifyContent="end" mt={1}>
          <Pagination
            count={Math.ceil(pagination.total / pagination.limit)}
            page={pagination.page}
            onChange={(_event, value) => handleChangePage(value)}
            siblingCount={1}
            boundaryCount={1}
            shape="rounded"
            variant="outlined"
          />
        </Box>
      )}
    </Box>
  );
}
