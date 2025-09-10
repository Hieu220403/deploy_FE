export const UserVerifyStatus = {
  Unverified: 0,
  Verified: 1,
  Banned: 2,
};

// MediaType as union type
export const MediaType = {
  Image: 0,
  Video: 1,
} as const;

// TokenType as union type
export type TokenType =
  | "AccessToken"
  | "RefreshToken"
  | "ResetPasswordToken"
  | "EmailVerifyToken";
export const TokenType = {
  AccessToken: "AccessToken" as TokenType,
  RefreshToken: "RefreshToken" as TokenType,
  ResetPasswordToken: "ResetPasswordToken" as TokenType,
  EmailVerifyToken: "EmailVerifyToken" as TokenType,
};

// RoleType as union type
export const RoleType = {
  User: 0,
  Admin: 1,
};

// DayOfWeek as union type
export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
export const DayOfWeek = {
  Monday: "Monday" as DayOfWeek,
  Tuesday: "Tuesday" as DayOfWeek,
  Wednesday: "Wednesday" as DayOfWeek,
  Thursday: "Thursday" as DayOfWeek,
  Friday: "Friday" as DayOfWeek,
  Saturday: "Saturday" as DayOfWeek,
  Sunday: "Sunday" as DayOfWeek,
};

export interface Media {
  url: string;
  mediaType: (typeof MediaType)[keyof typeof MediaType];
}
