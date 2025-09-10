import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Dialog, IconButton } from "@mui/material";
import { useRef } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Media } from "~/types/common";

interface SlideRestaurantProps {
  restaurantImages: Media[];
  open: boolean;
  index: number;
  onSetIndex: (index: number) => void;
  onClose: () => void;
}

const SlideRestaurant = ({
  restaurantImages,
  open,
  index,
  onSetIndex,
  onClose,
}: SlideRestaurantProps) => {
  const swiperRef = useRef<SwiperCore | null>(null);

  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        {/* Nút đóng */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "white",
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.4)",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.6)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Swiper */}
        <Swiper
          onSwiper={(s) => {
            swiperRef.current = s;
            setTimeout(() => {
              s.slideTo(index, 0);
              onSetIndex(index);
            }, 0);
          }}
          initialSlide={index}
          navigation={false}
          pagination={{ clickable: true }}
          keyboard={{ enabled: true }}
          zoom={{ maxRatio: 3 }}
          loop={true}
          style={{ width: "100%", height: "80vh" }}
        >
          {restaurantImages.map((m, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="swiper-zoom-container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "80vh",
                }}
              >
                <img
                  src={m.url}
                  alt={`img-${idx}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {restaurantImages.length > 1 && (
          <>
            {/* Nút Prev */}
            <IconButton
              sx={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                backgroundColor: "rgba(0,0,0,0.4)",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.6)",
                },
                zIndex: 10,
              }}
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            {/* Nút Next */}
            <IconButton
              sx={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                backgroundColor: "rgba(0,0,0,0.4)",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.6)",
                },
                zIndex: 10,
              }}
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </>
        )}
      </Box>
    </Dialog>
  );
};

export default SlideRestaurant;
