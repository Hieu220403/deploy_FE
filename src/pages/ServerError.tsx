import BugReportIcon from "@mui/icons-material/BugReport";
import { Box, Typography } from "@mui/material";

const ServerError = () => {
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
      <BugReportIcon sx={{ fontSize: 60, color: "gray" }} />
      <Typography variant="h3" fontWeight="bold" mt={2}>
        Oops!
      </Typography>
      <Typography variant="h5" mt={1}>
        Đã xảy ra lỗi
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        mt={1}
        mb={3}
        maxWidth="500px"
      >
        Chúng tôi đang gặp sự cố kỹ thuật. Đội ngũ đã được thông báo và đang
        khắc phục sự cố này.
      </Typography>
    </Box>
  );
};

export default ServerError;
