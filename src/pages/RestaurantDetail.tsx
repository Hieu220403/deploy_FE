import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { format } from "date-fns";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantDetailSkeleton from "~/components/common/Skeleton/RestaurantDetail";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { useAppSelector } from "~/hooks/useAppSelector";
import { getRestaurantDetail } from "~/redux/features/restaurant/actions";
import { groupOpeningHours } from "~/utils/formatDate";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReviewSkeleton from "~/components/common/Skeleton/Review";
import SlideRestaurant from "~/components/RestaurantDetail/SlideRestaurant";
import { getReviewsByRestaurant } from "~/redux/features/review/actions";
import Reviews from "~/components/RestaurantDetail/Reviews";
import ReviewInput from "~/components/RestaurantDetail/ReviewInput";
import type {
  SortByValue,
  SortOption,
} from "~/redux/features/restaurant/initialState";
import { sortReviewOptions } from "~/constants";
import type { PayloadGetReviewByRestaurant } from "~/redux/features/review/initialState";

const RestaurantDetail = () => {
  const { restaurant, loading } = useAppSelector((state) => state.restaurant);
  const {
    reviewsRestaurantDetail,
    loading: loadingReview,
    isLoadingMore,
  } = useAppSelector((state) => state.review);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const params = useParams();
  const restaurantId = params.id;

  const [rating, setRating] = useState<number | null>(0);
  const [sort, setSort] = useState<SortOption>(
    sortReviewOptions[0] as SortOption,
  );
  const [open, setOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState<number>(0);
  const [currentPageReview, setCurrentPageReview] = useState<number>(1);
  const openAt = (index: number) => {
    setInitialIndex(index);
    setOpen(true);
  };

  const close = () => setOpen(false);

  const getListReviews = React.useCallback(
    (params: Omit<PayloadGetReviewByRestaurant, "restaurantId">) => {
      dispatch(
        getReviewsByRestaurant({
          restaurantId: restaurantId!,
          ...params,
        }),
      );
    },
    [dispatch, restaurantId],
  );
  const handleLoadMore = () => {
    const nextPage = currentPageReview + 1;
    setCurrentPageReview(nextPage);
    getListReviews({
      page: nextPage,
      rating: rating || undefined,
      sortOrder: sort?.order,
      sortBy: sort?.value,
    });
  };

  const handleSort = (e: SelectChangeEvent) => {
    const value = e.target.value;
    const option = sortReviewOptions.find(
      (o) => `${o.value}_${o.order}` === value,
    );
    if (option) {
      setSort({
        label: option.label,
        value: option.value as SortByValue,
        order: option.order as "asc" | "desc",
      });
    }
    setCurrentPageReview(1);
  };

  const handleFilterRating = (value: number | string) => {
    const ratingValue = Number(value);
    if (!ratingValue) {
      setRating(0);
    } else {
      setRating(ratingValue);
    }
    setCurrentPageReview(1);
  };

  useEffect(() => {
    if (restaurantId) {
      dispatch(getRestaurantDetail(restaurantId!));
    }
  }, [dispatch, restaurantId]);

  useEffect(() => {
    if (restaurant)
      getListReviews({
        page: currentPageReview,
        rating: rating || undefined,
        sortBy: sort?.value,
        sortOrder: sort?.order,
      });
  }, [
    restaurant,
    dispatch,
    getListReviews,
    rating,
    sort?.order,
    sort?.value,
    currentPageReview,
  ]);

  if (loading) return <RestaurantDetailSkeleton />;
  if (!restaurant) {
    navigation("/not-found");
    return null;
  }
  return (
    <Box sx={{ p: 4, bgcolor: "#f9f9f9" }}>
      <Grid container spacing={3}>
        {/* Phần bên trái */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ mb: 3 }}>
            <Box
              sx={{
                bgcolor: "grey.400",
                height: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 24,
              }}
            >
              <CardMedia
                component="img"
                image={restaurant.avatar}
                alt={restaurant.name}
                sx={{ height: "300px", objectFit: "cover" }}
              />
            </Box>
            {restaurant.media && (
              <Grid container spacing={2} sx={{ p: 2 }}>
                {restaurant.media.map((m, i) => (
                  <Grid size={{ xs: 3 }} key={i}>
                    <Box
                      onClick={() => openAt(i)}
                      sx={{
                        height: 80,
                        overflow: "hidden",
                        borderRadius: 1,
                        cursor: "pointer",
                        "& img": {
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform .25s",
                        },
                        "&:hover img": { transform: "scale(1.05)" },
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={m.url}
                        alt={`${restaurant.name}-${i}`}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
          </Card>

          {/* Thông tin nhà hàng */}
          <Card sx={{ p: 2, mb: 3 }}>
            <Typography variant="h5">{restaurant.name}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Rating value={restaurant.rating} precision={0.1} readOnly />
              <Typography sx={{ ml: 1 }}>
                {restaurant.rating} ({restaurant.total_reviews || 0}) đánh giá
              </Typography>
            </Box>

            <Typography sx={{ mt: 2 }}>{restaurant.description}</Typography>
            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
              <Button variant="contained">Đặt bàn</Button>
              <Button variant="outlined" startIcon={<PhoneIcon />}>
                Gọi ngay
              </Button>
            </Box>
          </Card>

          {restaurant.menus && restaurant.menus.length > 0 && (
            <Card sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Thực đơn
              </Typography>
              <Grid container spacing={2}>
                {restaurant.menus.map((menu) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={menu._id}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        border: "1px solid #eee",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      {menu.media?.[0] && (
                        <CardMedia
                          component="img"
                          image={menu.media[0].url}
                          alt={menu.name}
                          sx={{ height: 160, objectFit: "cover" }}
                        />
                      )}
                      <Box sx={{ p: 2, flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {menu.name}
                        </Typography>
                        {menu.description && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            {menu.description}
                          </Typography>
                        )}
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          sx={{ mt: 1, color: "primary.main" }}
                        >
                          {Number(menu.price).toLocaleString("vi-VN")} đ
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Card>
          )}

          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Đánh giá của khách hàng</Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Rating value={restaurant.rating} precision={0.1} readOnly />
              <Typography sx={{ ml: 1 }}>
                {restaurant.rating} · {restaurant.total_reviews} đánh giá
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
              <FormControl size="small" sx={{ minWidth: 200, zIndex: 0 }}>
                <InputLabel>Đánh giá</InputLabel>
                <Select
                  value={rating ?? ""}
                  label="Rating"
                  onChange={(e) => handleFilterRating(e.target.value)}
                >
                  <MenuItem value="0">Tất cả</MenuItem>
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
                  onChange={handleSort}
                >
                  {sortReviewOptions.map((o) => (
                    <MenuItem
                      key={`${o.value}_${o.order}`}
                      value={`${o.value}_${o.order}`}
                    >
                      {o.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mb: 1 }}>
              <ReviewInput restaurantId={restaurant._id} />
            </Box>
            {!loadingReview && (
              <Reviews
                reviews={reviewsRestaurantDetail}
                totalReviews={restaurant.total_reviews || 0}
                onLoadMore={handleLoadMore}
                isLoadingMore={isLoadingMore}
              />
            )}
            {(loadingReview || isLoadingMore) &&
              Array.from({ length: 3 }).map((_, i) => (
                <Fragment key={i}>
                  <ReviewSkeleton />
                </Fragment>
              ))}
          </Card>
        </Grid>

        {/* Phần bên phải */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6">Thông tin liên hệ</Typography>
            <Box sx={{ mt: 1 }}>
              <Typography>
                <LocationOnIcon fontSize="small" /> {restaurant.address}
              </Typography>
              <Typography>
                <PhoneIcon fontSize="small" /> {restaurant.phone_number}
              </Typography>
              {restaurant.website && (
                <Typography>
                  <LanguageIcon fontSize="small" /> {restaurant.website}
                </Typography>
              )}
            </Box>
          </Card>

          {restaurant.weekly_opening_hours && (
            <Card sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6">Giờ mở cửa</Typography>
              {Object.entries(
                groupOpeningHours(restaurant.weekly_opening_hours),
              ).map(([timeRange, days]) => (
                <Box
                  key={timeRange}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    my: 1,
                  }}
                >
                  <Typography fontWeight="bold">{timeRange}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {days.join(", ")}
                  </Typography>
                </Box>
              ))}
            </Card>
          )}
          {restaurant.special_opening_days && (
            <Card sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6">Giờ mở cửa ngày lễ</Typography>
              {restaurant.special_opening_days?.map((h) => (
                <React.Fragment key={h.date.toString()}>
                  <Typography component="p" variant="body2">
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ fontWeight: "bold" }}
                    >
                      {h.note} {format(new Date(h.date), "dd/MM")}:
                    </Typography>{" "}
                    {h.open} - {h.close}
                  </Typography>{" "}
                </React.Fragment>
              ))}
            </Card>
          )}

          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Vị trí</Typography>
            <Box
              sx={{
                bgcolor: "grey.400",
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                mt: 2,
              }}
            >
              Bản đồ tương tác
            </Box>
            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
              Chỉ đường
            </Button>
          </Card>
        </Grid>
      </Grid>

      <SlideRestaurant
        open={open}
        onClose={close}
        index={initialIndex}
        restaurantImages={restaurant.media || []}
        onSetIndex={(idx: number) => setInitialIndex(idx)}
      />
    </Box>
  );
};

export default RestaurantDetail;
