import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";
import {
  FaceSmileIcon,
  HomeIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
} from "@mui/material";

import logo from "~/assets/images/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "white",
        color: "black",
        pt: 4,
        pb: 4,
        mt: 4,
        boxShadow: (theme) => theme.shadows[1],
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
            gap: 4,
          }}
        >
          {/* Thông tin thương hiệu */}
          <Box>
            <Link to={"/"}>
              <img src={logo} alt="Logo" className="h-20 w-20 cursor-pointer" />
            </Link>
            <Typography variant="body2" paragraph mt={1}>
              Chia sẻ trải nghiệm ẩm thực chân thực từ cộng đồng những người yêu
              thích ăn uống.
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EnvelopeIcon className="h-5 w-5" />
                <Typography variant="body2">contact@foodiereview.vn</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneIcon className="h-5 w-5" />
                <Typography variant="body2">+84 123 456 789</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MapPinIcon className="h-5 w-5" />
                <Typography variant="body2">Hà Nội, Việt Nam</Typography>
              </Box>
            </Box>
          </Box>

          {/* Liên kết nhanh */}
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Liên kết nhanh
            </Typography>
            <List>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <HomeIcon className="mr-2 h-5 w-5" />
                <Link to="/">Trang chủ</Link>
              </ListItem>
              <ListItem sx={{ p: 0, mb: 1 }}>
                <FaceSmileIcon className="mr-2 h-5 w-5" />
                <Link to="/">Về chúng tôi</Link>
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                <DocumentTextIcon className="mr-2 h-5 w-5" />
                <Link to="/">Chính sách bảo mật</Link>
              </ListItem>
            </List>
          </Box>

          {/* Đăng ký nhận tin */}
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Đăng ký nhận tin
            </Typography>
            <Typography variant="body2" paragraph>
              Đăng ký để nhận các bài đánh giá nhà hàng mới nhất mỗi tuần!
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => e.preventDefault()}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                type="email"
                placeholder="Nhập email của bạn"
                size="small"
                required
                InputProps={{
                  sx: {
                    borderRadius: 1,
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "warning.main",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "warning.dark" },
                }}
              >
                Đăng ký
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: (theme) => theme.palette.divider,
            mt: 6,
            pt: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} FoodieReview. Bản quyền thuộc về chúng
            tôi.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
export default Footer;
