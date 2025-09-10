import { Skeleton } from "@mui/material";

const CoverSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      width="100%"
      height={400}
      sx={{ borderRadius: 2 }}
    />
  );
};

export default CoverSkeleton;
