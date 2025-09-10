import hero1 from "~/assets/images/hero-1.jpg";
import hero2 from "~/assets/images/hero-2.jpg";
import hero3 from "~/assets/images/hero-3.jpg";

import { People, Restaurant } from "@mui/icons-material";
import { RoleType } from "~/types/common";
const pages = [
  { name: "Trang chủ", link: "/" },
  { name: "Nhà hàng", link: "/restaurants" },
];

const menuAdmin = [
  // { text: "Bảng điều khiển", href: "/admin/dashboard", icon: Dashboard },
  { text: "Nhà hàng", href: "/admin/restaurants", icon: Restaurant },
  // { text: "Đánh giá", href: "/admin/reviews", icon: Reviews },
  { text: "Người dùng", href: "/admin/users", icon: People },
];

const settings = [
  { name: "Trang cá nhân", link: "/profile" },
  { name: "Quản trị", link: "/admin/restaurants" },
  { name: "Đăng xuất" },
];
const hero = [hero1, hero2, hero3];

const sortRestaurantOptions = [
  { label: "Mới nhất", value: "created_at", order: "desc" },
  { label: "Cũ nhất", value: "created_at", order: "asc" },
  { label: "Đánh giá cao nhất", value: "rating", order: "desc" },
  { label: "Đánh giá thấp nhất", value: "rating", order: "asc" },
  { label: "Tên (A-Z)", value: "name", order: "asc" },
  { label: "Tên (Z-A)", value: "name", order: "desc" },
];

const sortReviewOptions = [
  { label: "Mới nhất", value: "created_at", order: "desc" },
  { label: "Cũ nhất", value: "created_at", order: "asc" },
  { label: "Đánh giá cao nhất", value: "rating", order: "desc" },
  { label: "Đánh giá thấp nhất", value: "rating", order: "asc" },
];

const sortUserOptions = [
  { label: "Mới nhất", value: "created_at", order: "desc" },
  { label: "Cũ nhất", value: "created_at", order: "asc" },
  { label: "Tên (A-Z)", value: "name", order: "asc" },
  { label: "Tên (Z-A)", value: "name", order: "desc" },
];
const filterRoleOptions = [
  { label: "Tất cả vai trò", value: "" },
  { label: "Quản trị viên", value: RoleType.Admin },
  { label: "Người dùng", value: RoleType.User },
];
const filterStatusOptions = [
  { label: "Tất cả trạng thái", value: "" },
  { label: "Hoạt động", value: "1" },
  { label: "Không hoạt động", value: "0" },
];
export {
  filterRoleOptions,
  filterStatusOptions, hero,
  menuAdmin,
  pages,
  settings,
  sortRestaurantOptions,
  sortReviewOptions,
  sortUserOptions
};

