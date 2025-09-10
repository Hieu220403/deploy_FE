import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
} from "@mui/material";
import { formatRelative } from "date-fns";
import type { ReviewRecent } from "~/types/review";
import { vi } from "date-fns/locale";

interface ReviewCardProps {
  review: ReviewRecent;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card
      sx={{
        bgcolor: "grey.50",
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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box display="flex" gap={2} alignItems="center">
            <Avatar src={review.user.avatar} alt={review.user.name} />
            <Box>
              <Box>
                <Typography fontWeight="bold">{review.user.name}</Typography>
                <Rating
                  size="small"
                  value={review.rating}
                  precision={0.1}
                  readOnly
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {review.restaurant.name} •{" "}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatRelative(new Date(review.created_at), new Date(), {
                  locale: vi,
                })}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography variant="body2" mt={2} color="text.primary">
          "{review.content}"
        </Typography>
      </CardContent>
    </Card>
  );
}
