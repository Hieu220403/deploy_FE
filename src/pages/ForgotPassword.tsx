import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CssBaseline,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import theme from "~/theme";
import Logo from "../assets/images/logo.png";
import { forgotPassword } from "~/redux/features/auth/actions";
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
});

type FormValues = yup.InferType<typeof schema>;

export default function ForgotPassword() {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const onSubmit = async (data: FormValues) => {
    try {
      const res = await dispatch(forgotPassword(data)).unwrap();
      if (res) {
        toast.success("Vui lòng kiểm tra email để  đặt lại mật khẩu");
      }
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
          Tìm tài khoản của bạn
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
              maxWidth: "500px",
              width: "100%",
            },
            boxShadow:
              "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
            ...theme.applyStyles("dark", {
              boxShadow:
                "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
            }),
          }}
        >
          <Box>
            <Typography component="p" variant="h6" sx={{ width: "100%" }}>
              Quên mật khẩu
            </Typography>
            <Typography
              component="p"
              variant="body2"
              sx={{ color: theme.palette.grey[600], width: "100%" }}
            >
              Vui lòng nhập địa chỉ email của bạn để tìm tài khoản.
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 1 }}>
              <FormLabel htmlFor="email">Email của bạn</FormLabel>
              <Controller
                name={"email"}
                control={control}
                defaultValue=""
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
            <Box
              sx={{
                width: "70%",
                display: "flex",
                gap: 2,
                mt: 1,
                ml: "auto",
              }}
            >
              <Button
                fullWidth
                href="/sign-in"
                variant="outlined"
                type="submit"
              >
                Quay lại
              </Button>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
              >
                Khôi phục
              </Button>
            </Box>
          </form>
        </Card>
      </Stack>
    </Box>
  );
}
