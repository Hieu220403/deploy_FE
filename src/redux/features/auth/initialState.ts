import type { User } from "~/types/user";
export type PayloadUpdateProfile = Partial<
  Pick<User, "name" | "bio" | "date_of_birth" | "username" | "avatar" | "cover">
>;
export type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  forgotPasswordToken: string | null;
  users: User[];
  loading: boolean;
  pagination: Pagination;
};
export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export interface PayloadGetUsers {
  page?: number;
  limit?: number;
  search?: string;
  name?: string;
  email?: string;
  role?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  is_active?: number;
}
export type ResponseUser = {
  data: User[];
  pagination: Pagination;
};

export const authStateReducer: AuthState = {
  user: (() => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  })(),
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  forgotPasswordToken: null,
  loading: false,
  users: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};
