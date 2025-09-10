/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Card,
  CssBaseline,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import * as yup from "yup";
import { useAppSelector } from "~/hooks/useAppSelector";
import {
  resetPassword,
  verifyForgotPasswordToken,
} from "~/redux/features/auth/actions";
import theme from "~/theme";
import Logo from "../assets/images/logo.png";
import { useAppDispatch } from "~/hooks/useAppDispatch";

const schema = yup.object({
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

export default function ForgotPassword() {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await dispatch(
        resetPassword({
          password: data.password,
          confirm_password: data.confirmPassword,
          forgot_password_token: token!,
        }),
      ).unwrap();
      if (result) {
        toast.success("Đặt lại mật khẩu thành công");
        setTimeout(() => {
          navigate("/sign-in");
        }, 1000);
      }
    } catch (error) {
      toast.error(error as string);
    }
  };
  useEffect(() => {
    if (!token) return;
    const verify = async () => {
      try {
        await verifyForgotPasswordToken(token!);
      } catch (error) {
        toast.error("Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn");
        setTimeout(() => {
          navigate("/forgot-password");
        }, 500);
      }
    };
    verify();
  }, [token, navigate]);

  if (!token) return null;
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
          Đặt lại mậu khẩu
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
            Vui lòng nhập mật khẩu mới của bạn
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 1 }}>
              <FormLabel htmlFor="password">Mật khẩu mới</FormLabel>
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
              Xác nhận
            </Button>
          </form>
        </Card>
      </Stack>
    </Box>
  );
}
