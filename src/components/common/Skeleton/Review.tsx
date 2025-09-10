import { Box, Skeleton } from "@mui/material";

const ReviewSkeleton = () => {
  return (
    <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
      <Skeleton variant="circular" width={40} height={40} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="30%" />
        <Skeleton variant="text" width="90%" />
      </Box>
    </Box>
  );
};

export default ReviewSkeleton;
