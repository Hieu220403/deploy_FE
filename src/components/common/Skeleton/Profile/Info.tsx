import { Skeleton } from "@mui/material";

const InfoSkeleton = () => {
  return (
    <>
      <Skeleton height={56} sx={{ mb: 2 }} />
      <Skeleton height={56} sx={{ mb: 2 }} />
      <Skeleton height={56} sx={{ mb: 2 }} />
      <Skeleton height={56} sx={{ mb: 2 }} />
      <Skeleton height={80} />
    </>
  );
};

export default InfoSkeleton;
