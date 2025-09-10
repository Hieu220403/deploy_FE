import { Avatar, Box, Button, Rating, Typography } from "@mui/material";
import { format } from "date-fns";
import { MediaType } from "~/types/common";
import type { Review } from "~/types/review";

interface ReviewsProps {
  reviews: Review[];
  totalReviews: number;
  onLoadMore?: () => void;
  isLoadingMore: boolean;
}

const Reviews = ({
  reviews,
  totalReviews,
  isLoadingMore,
  onLoadMore,
}: ReviewsProps) => {
  return (
    <>
      {totalReviews === 0 ? (
        <Typography>Chưa có đánh giá nào.</Typography>
      ) : (
        <>
          {reviews.map((review, idx) => (
            <Box key={idx} sx={{ mb: 3 }}>
              {/* User info */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar src={review.user.avatar}>
                  {!review.user.avatar && review.user.name[0]}
                </Avatar>
                <Box>
                  <Typography fontWeight="bold">{review.user.name}</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {format(new Date(review.created_at), "dd/MM/yyyy")}
                    </Typography>
                    <Rating value={review.rating} readOnly size="small" />
                  </Box>
                </Box>
              </Box>

              {/* Content */}
              <Typography sx={{ mt: 1 }}>{review.content}</Typography>

              {/* Media */}
              {review.media && (
                <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                  {review.media.map((file, i) => {
                    const isImage = file.mediaType === MediaType.Image;
                    return (
                      <Box
                        key={i}
                        sx={{
                          width: isImage ? 120 : "50%",
                          height: isImage ? 120 : 200,
                          borderRadius: 1,
                          overflow: "hidden",
                          border: "1px solid #ddd",
                        }}
                      >
                        {isImage ? (
                          <img
                            src={file.url}
                            alt={`media-${i}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <video
                            controls
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          >
                            <source src={file.url} type="video/mp4" />
                            Trình duyệt không hỗ trợ video.
                          </video>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
          ))}

          {reviews.length <= totalReviews ||
            (!isLoadingMore && (
              <Button
                variant="outlined"
                fullWidth
                disabled={isLoadingMore}
                onClick={onLoadMore}
              >
                Xem thêm đánh giá
              </Button>
            ))}
        </>
      )}
    </>
  );
};

export default Reviews;
