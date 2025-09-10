/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CameraAlt,
  Close,
  Edit,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import {
  AvatarSkeleton,
  CoverSkeleton,
  DetailSkeleton,
  InfoSkeleton,
} from "~/components/common/Skeleton/Profile";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { useAppSelector } from "~/hooks/useAppSelector";
import {
  changePassword,
  getProfile,
  updateProfile,
} from "~/redux/features/auth/actions";
import { UserVerifyStatus } from "~/types/common";

const profileSchema = yup.object().shape({
  name: yup.string().required("Họ và tên không được để trống"),
  username: yup.string().required("Tên người dùng không được để trống"),
  bio: yup.string().max(200, "Giới thiệu tối đa 200 ký tự"),
  date_of_birth: yup.date().required("Ngày sinh không hợp lệ"),
});

const passwordSchema = yup.object().shape({
  password: yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
  newPassword: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .matches(/^((?=.*[0-9])(?=.*[a-zA-Z]).{6,})$/, {
      message: "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số",
    }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng nhập lại mật khẩu mới"),
});

const Profile = () => {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [previewCover, setPreviewCover] = useState<string | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const coverInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
      date_of_birth: user?.date_of_birth
        ? new Date(user.date_of_birth)
        : undefined,
    },
  });

  const {
    control: controlPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: errorsPassword },
  } = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(getProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <CoverSkeleton />
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <AvatarSkeleton />
          <InfoSkeleton />
        </Box>

        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <DetailSkeleton />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (!user) return null;

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "cover" | "avatar",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    if (type === "cover") {
      setPreviewCover(previewUrl);
    } else {
      setPreviewAvatar(previewUrl);
    }
  };

  const onSubmitProfile = async (data: any) => {
    try {
      const result = await dispatch(
        updateProfile({
          ...data,
          ...(previewAvatar ? { avatar: previewAvatar } : {}),
          ...(previewCover ? { cover: previewCover } : {}),
        }),
      ).unwrap();
      if (result) {
        toast.success("Cập nhật thông tin thành công");
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật thông tin thất bại");
    }
  };

  const onSubmitPassword = async (data: any) => {
    try {
      const result = await dispatch(
        changePassword({
          password: data.password,
          confirm_password: data.confirmPassword,
        }),
      ).unwrap();
      if (result) {
        toast.success("Cập nhật mật khẩu thành công");
      }
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật mật khẩu thất bại");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Cover */}
      <Box
        sx={{
          height: 350,
          bgcolor: "grey.300",
          borderRadius: 2,
          position: "relative",
          backgroundImage: `url(${previewCover || user.cover || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {isEditing && (
          <>
            <Button
              startIcon={<CameraAlt />}
              variant="contained"
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
              }}
              onClick={() => coverInputRef.current?.click()}
            >
              Cập nhật ảnh bìa
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={coverInputRef}
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e, "cover")}
            />
          </>
        )}
      </Box>

      {/* Info */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 2, px: 3, pb: 2 }}>
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={previewAvatar || user.avatar || ""}
            sx={{
              width: 96,
              height: 96,
              border: "3px solid white",
            }}
          />
          {isEditing && (
            <>
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bgcolor: "white",
                  borderRadius: "50%",
                  p: 0.5,
                  boxShadow: 1,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "grey.100" },
                }}
                onClick={() => avatarInputRef.current?.click()}
              >
                <CameraAlt fontSize="small" />
              </Box>
              <input
                type="file"
                accept="image/*"
                ref={avatarInputRef}
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, "avatar")}
              />
            </>
          )}
        </Box>

        <Box sx={{ ml: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            @{user.email}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
            <Box
              sx={{
                px: 1,
                py: 0.2,
                bgcolor: "primary.main",
                color: "white",
                borderRadius: 1,
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            >
              {user.role?.role_name}
            </Box>
            <Typography variant="body2" color="text.secondary">
              Tham gia từ {format(new Date(user.created_at), "MM/yyyy")}
            </Typography>
          </Box>
        </Box>

        <Button
          startIcon={isEditing ? <Close /> : <Edit />}
          variant="contained"
          sx={{
            ml: "auto",
            color: "white",
            textTransform: "none",
          }}
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? "Hủy" : "Chỉnh sửa hồ sơ"}
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        {/* Thông tin cá nhân + đổi mật khẩu */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              {/* Form thông tin cá nhân */}
              <form onSubmit={handleSubmit(onSubmitProfile)}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Thông tin cá nhân
                </Typography>

                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      label="Họ và tên"
                      fullWidth
                      disabled={!isEditing}
                      error={!!errors.name}
                      helperText={errors.name?.message as string}
                      sx={{ mb: 2, zIndex: 0 }}
                    />
                  )}
                />

                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      label="Tên người dùng"
                      fullWidth
                      disabled={!isEditing}
                      error={!!errors.username}
                      helperText={errors.username?.message as string}
                      sx={{ mb: 2, zIndex: 0 }}
                    />
                  )}
                />

                <TextField
                  size="small"
                  label="Địa chỉ Email"
                  fullWidth
                  defaultValue={user.email}
                  disabled
                  sx={{ mb: 2, zIndex: 0 }}
                />

                <Controller
                  name="date_of_birth"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      label="Ngày sinh"
                      type="date"
                      fullWidth
                      disabled={!isEditing}
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.date_of_birth}
                      helperText={errors.date_of_birth?.message as string}
                      sx={{ mb: 2, zIndex: 0 }}
                    />
                  )}
                />

                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      label="Giới thiệu bản thân"
                      fullWidth
                      multiline
                      rows={3}
                      disabled={!isEditing}
                      error={!!errors.bio}
                      helperText={errors.bio?.message as string}
                      sx={{ mb: 2, zIndex: 0 }}
                    />
                  )}
                />

                {isEditing && (
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                  >
                    <Button sx={{ mr: 1 }} onClick={() => setIsEditing(false)}>
                      Hủy
                    </Button>
                    <Button type="submit" variant="contained">
                      Lưu thay đổi
                    </Button>
                  </Box>
                )}
              </form>

              {/* Form đổi mật khẩu */}
              <Divider sx={{ my: 2 }} />
              <form onSubmit={handlePasswordSubmit(onSubmitPassword)}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Bảo mật
                </Typography>

                <Controller
                  name="password"
                  control={controlPassword}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      label="Mật khẩu hiện tại"
                      type={showPassword.current ? "text" : "password"}
                      fullWidth
                      error={!!errorsPassword.password}
                      helperText={errorsPassword.password?.message as string}
                      sx={{ zIndex: 0 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowPassword((prev) => ({
                                  ...prev,
                                  current: !prev.current,
                                }))
                              }
                              edge="end"
                            >
                              {showPassword.current ? (
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

                <Controller
                  name="newPassword"
                  control={controlPassword}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      label="Mật khẩu mới"
                      type={showPassword.new ? "text" : "password"}
                      fullWidth
                      error={!!errorsPassword.newPassword}
                      helperText={errorsPassword.newPassword?.message as string}
                      sx={{ mt: 2, zIndex: 0 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowPassword((prev) => ({
                                  ...prev,
                                  new: !prev.new,
                                }))
                              }
                              edge="end"
                            >
                              {showPassword.new ? (
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

                <Controller
                  name="confirmPassword"
                  control={controlPassword}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      label="Xác nhận mật khẩu mới"
                      type={showPassword.confirm ? "text" : "password"}
                      fullWidth
                      error={!!errorsPassword.confirmPassword}
                      helperText={
                        errorsPassword.confirmPassword?.message as string
                      }
                      sx={{ mt: 2, zIndex: 0 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowPassword((prev) => ({
                                  ...prev,
                                  confirm: !prev.confirm,
                                }))
                              }
                              edge="end"
                            >
                              {showPassword.confirm ? (
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

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 1,
                    mt: 2,
                  }}
                >
                  <Button color="inherit">Hủy</Button>
                  <Button type="submit" variant="contained">
                    Cập nhật mật khẩu
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Chi tiết tài khoản + hành động nhanh */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              {/* Chi tiết tài khoản */}
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Chi tiết tài khoản
              </Typography>
              <Typography variant="body2">
                <strong>ID Người dùng:</strong> {user._id}
              </Typography>
              <Typography variant="body2">
                <strong>Vai trò:</strong> {user.role?.role_name}
              </Typography>
              <Typography variant="body2">
                <strong>Thành viên từ:</strong>{" "}
                {format(new Date(user.created_at), "dd/MM/yyyy")}
              </Typography>
              <Typography variant="body2" mb={2}>
                <strong>Cập nhật lần cuối:</strong>{" "}
                {format(new Date(user.updated_at), "dd/MM/yyyy")}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Cài đặt tài khoản */}
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Cài đặt tài khoản
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography>Xác minh Email</Typography>
                <Button
                  variant="outlined"
                  color={
                    user.verify === UserVerifyStatus.Verified
                      ? "success"
                      : "warning"
                  }
                >
                  {user.verify === 1
                    ? "Đã xác minh"
                    : "Chưa xác minh - Xác minh ngay"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
