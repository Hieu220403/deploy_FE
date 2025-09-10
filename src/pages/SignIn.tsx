import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Card,
  CssBaseline,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { signIn } from "~/redux/features/auth/actions";
import theme from "~/theme";
import Logo from "../assets/images/logo.png";
import { useAppSelector } from "~/hooks/useAppSelector";

const schema = yup.object({
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .test("is-valid-email", "Email không hợp lệ", (value) => {
      if (!value) return false;
      const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      return regex.test(value);
    }),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});

type FormValues = yup.InferType<typeof schema>;

export default function SignIn() {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const onSubmit = async (data: FormValues) => {
    await dispatch(signIn(data));
  };
  return (
    <Box>
      <Box>
        <img src={Logo} alt="Your Company" className="mx-auto h-20 w-20" />
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mt: 2,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Chào mừng bạn quay lại
        </Typography>
      </Box>
      <CssBaseline enableColorScheme />
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={{
          minHeight: "100%",
          padding: {
            xs: theme.spacing(1),
            md: theme.spacing(4),
          },
          "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            zIndex: -1,
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
            backgroundRepeat: "no-repeat",
            ...theme.applyStyles("dark", {
              backgroundImage:
                "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
            }),
          },
        }}
      >
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            width: "100%",
            padding: {
              xs: theme.spacing(2),
              md: theme.spacing(4),
            },
            gap: theme.spacing(2),
            margin: "auto",
            [theme.breakpoints.up("sm")]: {
              maxWidth: "450px",
            },
            boxShadow:
              "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
            ...theme.applyStyles("dark", {
              boxShadow:
                "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
            }),
          }}
        >
          <Typography component="p" variant="h6" sx={{ width: "100%" }}>
            Đăng nhập
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 1 }}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Controller
                name={"email"}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="password">Mật khẩu</FormLabel>
              <Controller
                name={"password"}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    size="small"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </FormControl>

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 2,
              }}
              disabled={loading}
            >
              Đăng Nhập
            </Button>
          </form>

          <Box sx={{ textAlign: "right" }}>
            <Link href="/forgot-password" variant="body1">
              Quên mật khẩu?
            </Link>
          </Box>
          <Divider>hoặc</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Bạn chưa có tài khoản?{" "}
              <Link
                href="/sign-up"
                variant="body1"
                sx={{ alignSelf: "center" }}
              >
                Đăng ký
              </Link>
            </Typography>
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}
