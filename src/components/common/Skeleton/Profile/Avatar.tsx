import { Skeleton } from "@mui/material";

const AvatarSkeleton = () => {
  return (
    <Skeleton
      variant="circular"
      width={100}
      height={100}
      sx={{ border: "3px solid white" }}
    />
  );
};

export default AvatarSkeleton;
