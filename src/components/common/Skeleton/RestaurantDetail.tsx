import { Box, Card, Divider, Grid, Skeleton } from "@mui/material";
import React from "react";

const RestaurantDetailSkeleton: React.FC = () => {
  return (
    <Box sx={{ p: 4, bgcolor: "#f9f9f9" }}>
      <Grid container spacing={3}>
        {/* Phần bên trái */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Ảnh chính */}
          <Card sx={{ mb: 3 }}>
            <Skeleton variant="rectangular" height={300} animation="wave" />
            <Grid container spacing={2} sx={{ p: 2 }}>
              {[1, 2, 3, 4].map((i) => (
                <Grid size={{ xs: 3 }} key={i}>
                  <Skeleton
                    variant="rectangular"
                    height={80}
                    animation="wave"
                  />
                </Grid>
              ))}
            </Grid>
          </Card>

          {/* Thông tin nhà hàng */}
          <Card sx={{ p: 2, mb: 3 }}>
            <Skeleton variant="text" width="40%" height={40} />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="80%" />
            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
              <Skeleton variant="rectangular" width={100} height={40} />
              <Skeleton variant="rectangular" width={100} height={40} />
            </Box>
          </Card>

          {/* Đánh giá */}
          <Card sx={{ p: 2 }}>
            <Skeleton variant="text" width="50%" height={30} />
            <Skeleton variant="text" width="30%" />

            <Divider sx={{ my: 2 }} />

            {[1, 2, 3].map((i) => (
              <Box key={i} sx={{ mb: 3, display: "flex", gap: 2 }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="30%" />
                  <Skeleton variant="text" width="90%" />
                </Box>
              </Box>
            ))}

            <Skeleton variant="rectangular" height={40} />
          </Card>
        </Grid>

        {/* Phần bên phải */}
        <Grid size={{ xs: 12, md: 4 }}>
          {/* Liên hệ */}
          <Card sx={{ p: 2, mb: 3 }}>
            <Skeleton variant="text" width="50%" height={30} />
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="text" width="100%" />
            ))}
          </Card>

          {/* Giờ mở cửa */}
          <Card sx={{ p: 2, mb: 3 }}>
            <Skeleton variant="text" width="40%" height={30} />
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  my: 0.5,
                }}
              >
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="40%" />
              </Box>
            ))}
          </Card>

          {/* Bản đồ */}
          <Card sx={{ p: 2 }}>
            <Skeleton variant="text" width="40%" height={30} />
            <Skeleton
              variant="rectangular"
              height={200}
              animation="wave"
              sx={{ mt: 2 }}
            />
            <Skeleton
              variant="rectangular"
              height={40}
              animation="wave"
              sx={{ mt: 2 }}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RestaurantDetailSkeleton;
