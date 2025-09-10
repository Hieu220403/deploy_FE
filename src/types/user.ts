// export type User = {
//   role: string;
// };
// client/src/types/user.ts
export type Role = {
  _id?: string;
  role_id?: number;
  role_name?: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  date_of_birth: string;
  verify: number;
  bio: string;
  username: string;
  avatar: string;
  cover: string;
  created_at: string;
  updated_at: string;
  role: Role;
  is_active: number;
  accessToken: string;
  refreshToken: string;
};
