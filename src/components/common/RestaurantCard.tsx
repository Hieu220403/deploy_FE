import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { type Restaurant } from "~/types/restautant";

interface RestaurantCardProps {
  restaurant: Restaurant;
}
const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
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
      <CardActionArea
        component={Link}
        to={`/restaurants/${restaurant._id}`}
        sx={{ flex: 1 }}
      >
        {/* Image */}
        {restaurant.avatar ? (
          <CardMedia
            component="img"
            image={restaurant.avatar}
            alt={restaurant.name}
            sx={{ height: "300px", objectFit: "cover" }}
          />
        ) : (
          <Box
            sx={{
              height: "300px",
              bgcolor: "grey.400",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          ></Box>
        )}

        {/* Content */}
        <CardContent>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="h6" fontWeight="bold">
              {restaurant.name}
            </Typography>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Rating max={1} value={1} readOnly />
              <Typography variant="body2">{restaurant.rating}</Typography>
            </Box>
          </Box>

          <Typography variant="body2">
            <b>Số lượng món ăn:</b> {restaurant?.menus?.length || 0}
          </Typography>
          <Typography variant="body2">
            <b>Địa chỉ:</b> {restaurant.address}
          </Typography>
          <Typography variant="body2">📞 {restaurant.phone_number}</Typography>

          {/* mô tả rút gọn */}
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <b>Mô tả:</b> {restaurant.description}
          </Typography>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Typography variant="body2" color="text.secondary">
              ({restaurant.total_reviews || 0}) đánh giá
            </Typography>
            <Button size="small" variant="contained">
              Xem chi tiết
            </Button>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RestaurantCard;
