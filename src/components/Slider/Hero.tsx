import { Box, CardMedia, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface HeroSliderProps {
  hero: string[];
}
const HeroSlider = ({ hero }: HeroSliderProps) => {
  return (
    <Box sx={{ position: "relative", width: "100%", height: 400, zIndex: 0 }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 3000 }}
        loop
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        style={{ height: "100%" }}
      >
        {/* Slide demo */}
        {hero.map((i) => (
          <SwiperSlide key={i}>
            <CardMedia
              component="img"
              image={i}
              alt={"hero image"}
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Prev Button */}
      <IconButton
        className="custom-prev"
        sx={{
          position: "absolute",
          top: "50%",
          left: 16,
          transform: "translateY(-50%)",
          zIndex: 10,
          bgcolor: "rgba(0,0,0,0.5)",
          color: "#fff",
          "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
          width: 48,
          height: 48,
        }}
      >
        <ArrowBackIos fontSize="small" />
      </IconButton>

      {/* Next Button */}
      <IconButton
        className="custom-next"
        sx={{
          position: "absolute",
          top: "50%",
          right: 16,
          transform: "translateY(-50%)",
          zIndex: 10,
          bgcolor: "rgba(0,0,0,0.5)",
          color: "#fff",
          "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
          width: 48,
          height: 48,
        }}
      >
        <ArrowForwardIos fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default HeroSlider;
