import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigation = useNavigate();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      px={2}
    >
      <WarningAmberIcon sx={{ fontSize: 60, color: "gray" }} />
      <Typography variant="h3" fontWeight="bold" mt={2}>
        404
      </Typography>
      <Typography variant="h5" mt={1}>
        Không tìm thấy trang
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        mt={1}
        mb={3}
        maxWidth="500px"
      >
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => navigation("/")}
        >
          Về Trang Chủ
        </Button>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigation(-1)}
        >
          Quay Lại
        </Button>
      </Stack>
    </Box>
  );
};

export default NotFound;
