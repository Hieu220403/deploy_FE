import type { SelectChangeEvent } from "@mui/material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { RestaurantCard } from "~/components/common";
import { RestaurantCardSkeleton } from "~/components/common/Skeleton";
import { sortRestaurantOptions } from "~/constants";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { useAppSelector } from "~/hooks/useAppSelector";
import { useDebounce } from "~/hooks/useDebounce";
import { getRestaurants, setPage } from "~/redux/features/restaurant/actions";
import type {
  SortByValue,
  SortOption,
} from "~/redux/features/restaurant/initialState";

export default function RestaurantList() {
  const dispatch = useAppDispatch();
  const { restaurants, pagination, loading } = useAppSelector(
    (state) => state.restaurant,
  );
  const [rating, setRating] = useState<number | null>(0);
  const [sort, setSort] = useState<SortOption>(
    sortRestaurantOptions[0] as SortOption,
  );
  const [search, setSearch] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search, 300);

  const handleGetRestaurants = useCallback(async () => {
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

  const handleClearFilters = () => {
    setRating(0);
    setSort(sortRestaurantOptions[0] as SortOption);
    setSearch(null);
    dispatch(setPage(1));
  };
  useEffect(() => {
    handleGetRestaurants();
  }, [sort, debouncedSearch, rating, handleGetRestaurants]);

  return (
    <Box p={3}>
      <Box mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Danh sách nhà hàng
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Khám phá và tìm hiểu các nhà hàng trong khu vực của bạn
        </Typography>
      </Box>

      {/* Filter */}
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        mb={4}
        p={2}
        border="1px solid #e0e0e0"
        borderRadius={2}
      >
        <TextField
          placeholder="Tìm kiếm nhà hàng"
          size="small"
          value={search || ""}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, minWidth: 200, zIndex: 0 }}
        />
        <FormControl size="small" sx={{ minWidth: 200, zIndex: 0 }}>
          <InputLabel>Đánh giá</InputLabel>
          <Select
            value={rating || ""}
            label="Rating"
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <MenuItem value={0} onClick={() => setRating(null)}>
              Tất cả
            </MenuItem>
            {[5, 4, 3, 2, 1].map((r) => (
              <MenuItem key={r} value={r}>
                {r} <Rating size="small" value={r} readOnly />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 250, zIndex: 0 }}>
          <InputLabel>Sắp xếp</InputLabel>
          <Select
            value={sort ? `${sort.value}_${sort.order}` : ""}
            label="Sắp xếp"
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

        <Button
          variant="outlined"
          onClick={handleClearFilters}
          sx={{ textWrap: "nowrap", width: "fit-content" }}
        >
          Xóa bộ lọc
        </Button>
      </Box>
      {/* Restaurant Cards */}
      <Grid container spacing={3}>
        {loading ? (
          Array.from(new Array(6)).map((_, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <RestaurantCardSkeleton />
            </Grid>
          ))
        ) : restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={restaurant._id}>
              <RestaurantCard restaurant={restaurant} />
            </Grid>
          ))
        ) : (
          <Box width="100%" textAlign="center" mt={4}>
            <Typography variant="h6" color="text.secondary">
              Không tìm thấy nhà hàng nào
            </Typography>
          </Box>
        )}
      </Grid>

      {/* Pagination */}
      {restaurants.length > 0 && (
        <Box display="flex" justifyContent="center" mt={4}>
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
