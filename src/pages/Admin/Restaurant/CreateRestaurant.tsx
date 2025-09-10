/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  MenuItem,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { useAppSelector } from "~/hooks/useAppSelector";
import { createMenu, uploadImageMenu } from "~/redux/features/menu/actions";
import { createRes, uploadImageRes } from "~/redux/features/restaurant/actions";

// ✅ Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Tên nhà hàng bắt buộc"),
  avatar: yup.string().required("Ảnh đại diện bắt buộc"),
  description: yup.string().required("Mô tả bắt buộc"),
  address: yup.string().required("Địa chỉ bắt buộc"),
  phone_number: yup
    .string()
    .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại bắt buộc"),
  weekly_opening_hours: yup.array().of(
    yup.object().shape({
      day_of_week: yup.string().required("Chọn thứ"),
      open: yup.string().required("Giờ mở cửa bắt buộc"),
      close: yup.string().required("Giờ đóng cửa bắt buộc"),
    }),
  ),
  special_opening_days: yup.array().of(
    yup.object().shape({
      date: yup.string().required("Chọn ngày"),
      open: yup.string().required("Giờ mở cửa bắt buộc"),
      close: yup.string().required("Giờ đóng cửa bắt buộc"),
      note: yup.string(),
    }),
  ),
  menu: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Tên món bắt buộc"),
      price: yup.number().min(0, "Giá không hợp lệ").required("Giá bắt buộc"),
      description: yup.string(),
      image: yup.string().required("Ảnh món bắt buộc"),
    }),
  ),
});

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function CreateRestaurantWithMenu() {
  const dispatch = useAppDispatch();
  const { loadingUpload } = useAppSelector((state) => state.restaurant);
  const { loadingMenu } = useAppSelector((state) => state.menu);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      avatar: "",
      description: "",
      address: "",
      phone_number: "",
      weekly_opening_hours: [
        { day_of_week: "Monday", open: "08:00", close: "22:00" },
      ],
      special_opening_days: [],
      menu: [],
    },
  });

  // giờ mở cửa
  const {
    fields: weeklyFields,
    append: addWeekly,
    remove: removeWeekly,
  } = useFieldArray({ control, name: "weekly_opening_hours" });

  const {
    fields: specialFields,
    append: addSpecial,
    remove: removeSpecial,
  } = useFieldArray({ control, name: "special_opening_days" });

  // menu
  const {
    fields: menuFields,
    append: addMenu,
    remove: removeMenu,
  } = useFieldArray({ control, name: "menu" });

  const handleUploadFile = async (
    type: "res" | "menu",
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
  ) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      try {
        let res;
        if (type === "menu")
          res = await dispatch(uploadImageMenu(file)).unwrap();
        else res = await dispatch(uploadImageRes(file)).unwrap();
        field.onChange(res?.url);
      } catch (err) {
        console.error("Upload thất bại", err);
      }
    }
  };
  const onSubmit = async (data: any) => {
    try {
      const { menu, ...resData } = data;
      // Tạo nhà hàng
      const res = await dispatch(
        createRes({
          ...resData,
        }),
      ).unwrap();

      if (res) {
        const menuWithImages = menu.map((item: any) => ({
          name: item.name,
          price: String(item.price),
          description: item.description,
          media: [
            {
              mediaType: 0,
              url: item.image,
            },
          ],
        }));
        await Promise.all(
          menuWithImages.map((item: any) =>
            dispatch(
              createMenu({
                restaurant_id: res._id,
                menu: item,
              }),
            ).unwrap(),
          ),
        );
        toast.success("Tạo nhà hàng và menu thành công");
        reset();
      }
    } catch (error) {
      toast.error("Tạo nhà hàng thất bại");
      console.error("Error creating restaurant and menu:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Quản lý Nhà hàng & Menu
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ================== THÔNG TIN NHÀ HÀNG ================== */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Thông tin nhà hàng
            </Typography>
            <Grid container spacing={2}>
              {/* Tên */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Tên nhà hàng"
                      size="small"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message as string}
                    />
                  )}
                />
              </Grid>

              {/* Avatar Upload */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="avatar"
                  control={control}
                  render={({ field }) => (
                    <Box>
                      {loadingUpload ? (
                        <Skeleton
                          variant="rectangular"
                          width={120}
                          height={120}
                          sx={{ borderRadius: 2, mb: 1 }}
                        />
                      ) : field.value ? (
                        <Box>
                          <Box
                            component="img"
                            src={field.value}
                            alt="Avatar"
                            sx={{
                              width: 120,
                              height: 120,
                              objectFit: "cover",
                              borderRadius: 2,
                              border: "1px solid #ddd",
                              mb: 1,
                            }}
                          />
                          <Box display="flex" gap={1}>
                            <Button
                              variant="outlined"
                              component="label"
                              size="small"
                            >
                              Đổi ảnh
                              <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={(e) =>
                                  handleUploadFile("res", e, field)
                                }
                              />
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => field.onChange("")}
                            >
                              Xóa ảnh
                            </Button>
                          </Box>
                        </Box>
                      ) : (
                        <Button
                          variant="outlined"
                          component="label"
                          fullWidth
                          sx={{ height: 40 }}
                        >
                          Upload ảnh
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => handleUploadFile("res", e, field)}
                          />
                        </Button>
                      )}

                      {errors.avatar && (
                        <Typography color="error" variant="caption">
                          {errors.avatar.message as string}
                        </Typography>
                      )}
                    </Box>
                  )}
                />
              </Grid>

              {/* Mô tả */}
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Mô tả"
                      size="small"
                      fullWidth
                      multiline
                      rows={3}
                      error={!!errors.description}
                      helperText={errors.description?.message as string}
                    />
                  )}
                />
              </Grid>

              {/* Địa chỉ */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Địa chỉ"
                      size="small"
                      fullWidth
                      error={!!errors.address}
                      helperText={errors.address?.message as string}
                    />
                  )}
                />
              </Grid>

              {/* SĐT */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="phone_number"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Số điện thoại"
                      size="small"
                      fullWidth
                      error={!!errors.phone_number}
                      helperText={errors.phone_number?.message as string}
                    />
                  )}
                />
              </Grid>
            </Grid>

            {/* Giờ mở cửa hàng tuần */}
            <Box mt={2}>
              <Typography fontWeight={600}>Giờ mở cửa hàng tuần</Typography>
              {weeklyFields.map((f, i) => (
                <Grid
                  container
                  spacing={2}
                  key={f.id}
                  alignItems="center"
                  mt={1}
                >
                  <Grid size={{ xs: 3 }}>
                    <Controller
                      name={`weekly_opening_hours.${i}.day_of_week`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          label="Thứ"
                          size="small"
                          fullWidth
                        >
                          {weekdays.map((d) => (
                            <MenuItem key={d} value={d}>
                              {d}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 3 }}>
                    <Controller
                      name={`weekly_opening_hours.${i}.open`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="time"
                          size="small"
                          label="Mở"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 3 }}>
                    <Controller
                      name={`weekly_opening_hours.${i}.close`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="time"
                          size="small"
                          label="Đóng"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 1 }}>
                    <IconButton onClick={() => removeWeekly(i)}>
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={() =>
                  addWeekly({
                    day_of_week: "Monday",
                    open: "08:00",
                    close: "22:00",
                  })
                }
                sx={{ mt: 1 }}
              >
                Thêm giờ
              </Button>
            </Box>

            {/* Ngày đặc biệt */}
            <Box mt={2}>
              <Typography fontWeight={600}>Ngày mở cửa đặc biệt</Typography>
              {specialFields.map((f, i) => (
                <Grid
                  container
                  spacing={2}
                  key={f.id}
                  alignItems="center"
                  mt={1}
                >
                  <Grid size={{ xs: 3 }}>
                    <Controller
                      name={`special_opening_days.${i}.date`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="date"
                          size="small"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 2 }}>
                    <Controller
                      name={`special_opening_days.${i}.open`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="time"
                          size="small"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 2 }}>
                    <Controller
                      name={`special_opening_days.${i}.close`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="time"
                          size="small"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <Controller
                      name={`special_opening_days.${i}.note`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Ghi chú"
                          size="small"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 1 }}>
                    <IconButton onClick={() => removeSpecial(i)}>
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={() =>
                  addSpecial({ date: "", open: "", close: "", note: "" })
                }
                sx={{ mt: 1 }}
              >
                Thêm ngày
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* ================== MENU ITEMS ================== */}
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Menu
            </Typography>
            {menuFields.map((f, i) => (
              <Box
                key={f.id}
                mb={2}
                p={2}
                border="1px solid #ddd"
                borderRadius={2}
              >
                <Grid container spacing={2}>
                  <Grid size={{ xs: 4 }}>
                    <Controller
                      name={`menu.${i}.name`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Tên món"
                          size="small"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 2 }}>
                    <Controller
                      name={`menu.${i}.price`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="number"
                          label="Giá (VND)"
                          size="small"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>

                  {/* Upload ảnh menu */}
                  <Grid size={{ xs: 3 }}>
                    <Controller
                      name={`menu.${i}.image`}
                      control={control}
                      render={({ field }) => (
                        <Box>
                          {loadingMenu ? (
                            <Skeleton
                              variant="rectangular"
                              width="50%"
                              height={100}
                              sx={{ borderRadius: 2, mb: 1 }}
                            />
                          ) : field.value ? (
                            <Box>
                              <Box
                                component="img"
                                src={field.value}
                                alt="Menu item"
                                sx={{
                                  width: "50%",
                                  height: 100,
                                  objectFit: "cover",
                                  borderRadius: 2,
                                  border: "1px solid #ddd",
                                  mb: 1,
                                }}
                              />
                              <Box display="flex" gap={1}>
                                <Button
                                  variant="outlined"
                                  component="label"
                                  size="small"
                                >
                                  Đổi ảnh
                                  <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleUploadFile("menu", e, field)
                                    }
                                  />
                                </Button>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  size="small"
                                  onClick={() => field.onChange("")}
                                >
                                  Xóa ảnh
                                </Button>
                              </Box>
                            </Box>
                          ) : (
                            <Button
                              variant="outlined"
                              component="label"
                              fullWidth
                              sx={{ height: 40 }}
                            >
                              Upload ảnh
                              <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={(e) =>
                                  handleUploadFile("menu", e, field)
                                }
                              />
                            </Button>
                          )}
                        </Box>
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Controller
                      name={`menu.${i}.description`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Mô tả"
                          size="small"
                          fullWidth
                          multiline
                          rows={2}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }} textAlign="right">
                    <IconButton onClick={() => removeMenu(i)}>
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            ))}
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() =>
                addMenu({ name: "", price: 0, description: "", image: "" })
              }
            >
              Thêm món
            </Button>
          </CardContent>
        </Card>

        {/* ================== SUBMIT ================== */}
        <Box mt={3} textAlign="right">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loadingUpload || loadingMenu}
          >
            Lưu tất cả
          </Button>
        </Box>
      </form>
    </Box>
  );
}
