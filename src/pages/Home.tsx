import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { RestaurantCard } from "~/components/common";
import { RestaurantCardSkeleton } from "~/components/common/Skeleton";
import ReviewCardSkeleton from "~/components/common/Skeleton/ReviewCard";
import ReviewCard from "~/components/ReviewCard";
import HeroSlider from "~/components/Slider/Hero";
import { hero } from "~/constants";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { useAppSelector } from "~/hooks/useAppSelector";
import { getFeaturedRestaurants } from "~/redux/features/restaurant/actions";
import { getReviewsRecent } from "~/redux/features/review/actions";

export default function Home() {
  const dispatch = useAppDispatch();
  const { featuredRestaurants, loading } = useAppSelector(
    (state) => state.restaurant,
  );
  const { reviewsRecent, loadingRecent } = useAppSelector(
    (state) => state.review,
  );
  useEffect(() => {
    const fetchData = async () => {
      await Promise.allSettled([
        dispatch(getFeaturedRestaurants()),
        dispatch(getReviewsRecent()),
      ]);
    };
    fetchData();
  }, [dispatch]);

  return (
    <Box sx={{}}>
      <HeroSlider hero={hero} />
      <Box sx={{ px: 4, mt: 4 }}>
        <Typography variant="h5" fontWeight="bold">
          Nhà hàng nổi bật
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Khám phá những trải nghiệm ẩm thực tuyệt vời từ các nhà hàng được
          chúng tôi lựa chọn kỹ lưỡng
        </Typography>

        <Box sx={{ position: "relative", width: "100%", zIndex: 0 }}>
          <Swiper
            modules={[Navigation, Pagination]}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".restaurant-next",
              prevEl: ".restaurant-prev",
            }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              600: { slidesPerView: 2 },
              960: { slidesPerView: 3 },
            }}
            style={{
              paddingBottom: "35px",
              height: "100%",
            }}
          >
            {loading
              ? Array.from(new Array(6)).map((_, i) => (
                  <SwiperSlide key={i}>
                    <RestaurantCardSkeleton />
                  </SwiperSlide>
                ))
              : featuredRestaurants.map((r) => (
                  <SwiperSlide
                    key={r._id}
                    style={{ display: "flex", height: "auto" }}
                  >
                    <RestaurantCard restaurant={r} />
                  </SwiperSlide>
                ))}
          </Swiper>
          {/* Custom Prev Button */}
          <IconButton
            className="restaurant-prev"
            sx={{
              position: "absolute",
              top: "50%",
              left: -20,
              transform: "translateY(-50%)",
              zIndex: 10,
              bgcolor: "#fff",
              border: "1px solid #ddd",
              "&:hover": { bgcolor: "#f5f5f5" },
              width: 35,
              height: 35,
            }}
          >
            <ArrowBackIos fontSize="small" />
          </IconButton>

          {/* Custom Next Button */}
          <IconButton
            className="restaurant-next"
            sx={{
              position: "absolute",
              top: "50%",
              right: -20,
              transform: "translateY(-50%)",
              zIndex: 10,
              bgcolor: "#fff",
              border: "1px solid #ddd",
              "&:hover": { bgcolor: "#f5f5f5" },
              width: 35,
              height: 35,
            }}
          >
            <ArrowForwardIos fontSize="small" />
          </IconButton>

          <Link to="/restaurants">
            <Button
              variant="outlined"
              sx={{
                display: "block",
                margin: "0 auto",
              }}
            >
              Xem thêm
            </Button>
          </Link>
        </Box>

        <Typography variant="h5" fontWeight="bold" my={4}>
          Đánh giá gần đây
        </Typography>

        <Box sx={{ width: "100%", position: "relative", zIndex: 0 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Prev Button */}
            <IconButton
              className="review-prev"
              sx={{
                bgcolor: "#fff",
                border: "1px solid #ddd",
                "&:hover": { bgcolor: "#f5f5f5" },
                zIndex: 2,
              }}
            >
              <ArrowBackIos fontSize="small" />
            </IconButton>

            {/* Swiper */}
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              pagination={{ clickable: true }}
              navigation={{
                nextEl: ".review-next",
                prevEl: ".review-prev",
              }}
              autoplay={{ delay: 3000 }}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                600: { slidesPerView: 1 },
                960: { slidesPerView: 4 },
              }}
              style={{
                padding: "0 20px 35px",
                flex: 1,
              }}
            >
              {loadingRecent
                ? Array.from(new Array(6)).map((_, i) => (
                    <SwiperSlide key={i} style={{ height: "auto" }}>
                      <ReviewCardSkeleton />
                    </SwiperSlide>
                  ))
                : reviewsRecent.map((review) => (
                    <SwiperSlide key={review._id} style={{ height: "auto" }}>
                      <ReviewCard review={review} />
                    </SwiperSlide>
                  ))}
            </Swiper>

            {/* Next Button */}
            <IconButton
              className="review-next"
              sx={{
                bgcolor: "#fff",
                border: "1px solid #ddd",
                "&:hover": { bgcolor: "#f5f5f5" },
                zIndex: 2,
              }}
            >
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Box>
          {/* Thống kê */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr", // mobile: 1 cột
                sm: "repeat(2, 1fr)", // tablet: 2 cột
                md: "repeat(3, 1fr)", // desktop: 3 cột
              },
              gap: 4,
              textAlign: "center",
              bgcolor: "#f9f9f9",
              py: 6,
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold">
                1,250+
              </Typography>
              <Typography color="text.secondary">
                Nhà hàng đã được liệt kê
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                15,000+
              </Typography>
              <Typography color="text.secondary">
                Đánh giá đã được viết
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                5,000+
              </Typography>
              <Typography color="text.secondary">
                Người dùng đang hoạt động
              </Typography>
            </Box>
          </Box>

          {/* CTA */}
          <Box
            sx={{
              bgcolor: "#000",
              color: "#fff",
              textAlign: "center",
              py: 8,
              px: 2,
            }}
          >
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Tham Gia Cộng Đồng Của Chúng Tôi
            </Typography>
            <Typography variant="body1" mb={4}>
              Chia sẻ trải nghiệm ẩm thực của bạn và giúp người khác khám phá
              những nhà hàng tuyệt vời.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#fff",
                  color: "#000",
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                Viết Đánh Giá
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "#fff",
                  borderColor: "#fff",
                  "&:hover": { borderColor: "#f5f5f5" },
                }}
              >
                Thêm Nhà Hàng
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
