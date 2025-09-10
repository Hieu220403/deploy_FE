import LockIcon from "@mui/icons-material/Lock";
import { Box, Typography } from "@mui/material";

const Forbidden = () => {
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
      <LockIcon sx={{ fontSize: 60, color: "gray" }} />
      <Typography variant="h3" fontWeight="bold" mt={2}>
        403
      </Typography>
      <Typography variant="h5" mt={1}>
        Truy cập bị từ chối
      </Typography>
      <Typography variant="body1" color="text.secondary" mt={1} mb={3} maxWidth="500px">
        Bạn không có quyền truy cập vào tài nguyên này. Vui lòng liên hệ quản trị viên nếu bạn tin rằng đây là sự nhầm lẫn.
      </Typography>
    </Box>
  );
};

export default Forbidden;
