import { Box, Card, CardContent, Skeleton } from "@mui/material";

export default function RestaurantCardSkeleton() {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      {/* Skeleton Image */}
      <Skeleton variant="rectangular" height={300} />

      {/* Content */}
      <CardContent sx={{ flex: 1 }}>
        {/* Tên + rating */}
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Skeleton variant="text" width="60%" height={30} />
          <Box display="flex" alignItems="center" gap={0.5}>
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="text" width={30} height={20} />
          </Box>
        </Box>

        {/* Số món ăn */}
        <Skeleton variant="text" width="50%" />

        {/* Địa chỉ */}
        <Skeleton variant="text" width="80%" />

        {/* Phone */}
        <Skeleton variant="text" width="40%" />

        {/* Giờ mở cửa */}
        <Skeleton variant="text" width="70%" />

        {/* Mô tả */}
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="85%" />

        {/* Footer */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Skeleton variant="text" width={80} height={20} />
          <Skeleton
            variant="rectangular"
            width={100}
            height={36}
            sx={{ borderRadius: 1 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
