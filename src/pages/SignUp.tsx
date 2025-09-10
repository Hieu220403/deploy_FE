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
import { signUp } from "~/redux/features/auth/actions";
import theme from "~/theme";
import Logo from "../assets/images/logo.png";
import { toast } from "sonner";
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
  name: yup
    .string()
    .required("Vui lòng nhập tên người dùng")
    .min(3, "Tên người dùng phải có ít nhất 3 ký tự")
    .max(20, "Tên người dùng không được vượt quá 20 ký tự"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .matches(/^((?=.*[0-9])(?=.*[a-zA-Z]).{6,})$/, {
      message: "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số",
    }),
  confirmPassword: yup
    .string()
    .required("Vui lòng xác nhận mật khẩu")
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không trùng khớp"),
});

type FormValues = yup.InferType<typeof schema>;

export default function SignUp() {
  const { handleSubmit, control, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await dispatch(
        signUp({
          ...data,
          confirm_password: data.confirmPassword,
        }),
      ).unwrap();
      if (res) {
        toast.success("Đăng ký tài khoản thành công");
        reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(error as string);
    }
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
          Tạo tài khoản của bạn
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
            gap: theme.spacing(1),
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
            Đăng ký
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
            <FormControl fullWidth sx={{ mb: 1 }}>
              <FormLabel htmlFor="name">Username</FormLabel>
              <Controller
                name={"name"}
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

            <FormControl fullWidth sx={{ mb: 1 }}>
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
            <FormControl fullWidth sx={{ mb: 1 }}>
              <FormLabel htmlFor="confirmPassword">Xác nhận mật khẩu</FormLabel>
              <Controller
                name={"confirmPassword"}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    size="small"
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
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
              Đăng ký
            </Button>
          </form>

          <Divider>hoặc</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Bạn đã có tài khoản?{" "}
              <Link
                href="/sign-in"
                variant="body1"
                sx={{ alignSelf: "center" }}
              >
                Đăng nhập
              </Link>
            </Typography>
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}
