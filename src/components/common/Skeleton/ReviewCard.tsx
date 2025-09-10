import { Box, Card, CardContent, Skeleton } from "@mui/material";

export default function ReviewCardSkeleton() {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 1,
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent sx={{ flex: 1, p: 0 }}>
        {/* Header */}
        <Box display="flex" alignItems="flex-start" gap={2}>
          <Skeleton variant="circular" width={40} height={40} />

          <Box flex={1}>
            {/* User name */}
            <Skeleton variant="text" width={120} height={20} />

            {/* Rating */}
            <Box display="flex" gap={0.5} mt={0.5}>
              {Array.from(new Array(5)).map((_, i) => (
                <Skeleton key={i} variant="circular" width={16} height={16} />
              ))}
            </Box>

            {/* Restaurant + time */}
            <Skeleton variant="text" width={160} height={16} />
            <Skeleton variant="text" width={100} height={14} />
          </Box>
        </Box>

        {/* Review content */}
        <Box mt={2}>
          <Skeleton variant="text" width="95%" height={18} />
          <Skeleton variant="text" width="85%" height={18} />
          <Skeleton variant="text" width="70%" height={18} />
        </Box>
      </CardContent>
    </Card>
  );
}
