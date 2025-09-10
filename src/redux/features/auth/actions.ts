/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import httpRequest from "~/services/httpRequest";
import type { User } from "~/types/user";
import { getAxiosMessage } from "~/utils/error";
import type {
  PayloadGetUsers,
  PayloadUpdateProfile,
  ResponseUser,
} from "./initialState";

export const setAccessToken = createAction<string>("auth/set-access-token");
export const signOut = createAction("auth/sign-out");

export const refreshToken = async (token: string): Promise<string> => {
  if (!token) return "";
  const { data: res } = await httpRequest.post<any>("/v1/users/refresh-token", {
    refresh_token: token,
  });
  return res.accessToken as string;
};

export const signIn = createAsyncThunk<
  {
    user: User;
    accessToken: string;
    refreshToken: string;
  },
  { email: string; password: string },
  { rejectValue: string }
>("auth/sign-in", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await httpRequest.post<User>("/v1/users/sign-in", payload);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data));
    return {
      user: data,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  } catch (e) {
    return rejectWithValue(getAxiosMessage(e, "Sign in failed"));
  }
});

export const signUp = createAsyncThunk<
  { message: string; insertedId?: string },
  {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
  },
  { rejectValue: string }
>("auth/sign-up", async (payload, { rejectWithValue }) => {
  try {
    const { data: res } = await httpRequest.post("/v1/users/sign-up", payload);
    return res.insertedId;
  } catch (e) {
    return rejectWithValue(getAxiosMessage(e, "Sign up failed"));
  }
});

export const forgotPassword = createAsyncThunk<string, { email: string }>(
  "auth/forgot-password",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await httpRequest.post<string>(
        "/v1/users/forgot-password",
        payload,
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(getAxiosMessage(e, "Sign in failed"));
    }
  },
);

export const verifyForgotPasswordToken = createAsyncThunk<
  boolean,
  string,
  { rejectValue: string }
>("auth/verify-forgot-password-token", async (token, { rejectWithValue }) => {
  try {
    const res = await httpRequest.post<boolean>(
      "/v1/users/verify-forgot-password",
      { forgot_password_token: token },
    );
    return res.data;
  } catch (e) {
    return rejectWithValue(
      getAxiosMessage(e, "Verify forgot password token failed"),
    );
  }
});
export const resetPassword = createAsyncThunk<
  boolean,
  {
    password: string;
    confirm_password: string;
    forgot_password_token: string;
  },
  { rejectValue: string }
>("auth/reset-password", async (payload, { rejectWithValue }) => {
  try {
    const res = await httpRequest.post<boolean>(
      "/v1/users/verify-forgot-password",
      payload,
    );
    return res.data;
  } catch (e) {
    return rejectWithValue(getAxiosMessage(e, "Reset password failed"));
  }
});
export const clearAuth = createAction("auth/clear");
export const getProfile = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/get-profile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await httpRequest.get<User>("/v1/users/my-profile");
      return data;
    } catch (e) {
      return rejectWithValue(getAxiosMessage(e, "Get profile failed"));
    }
  },
);
export const updateProfile = createAsyncThunk<
  User,
  PayloadUpdateProfile,
  { rejectValue: string }
>("auth/update-profile", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await httpRequest.patch<User>(
      "/v1/users/my-profile",
      payload,
    );

    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (e) {
    return rejectWithValue(getAxiosMessage(e, "Update profile failed"));
  }
});

export const changePassword = createAsyncThunk<
  boolean,
  { password: string; confirm_password: string },
  { rejectValue: string }
>("auth/change-password", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await httpRequest.post<boolean>(
      "/v1/users/change-password",
      payload,
    );
    return data;
  } catch (e) {
    return rejectWithValue(getAxiosMessage(e, "Change password failed"));
  }
});

export const getListUser = createAsyncThunk<
  ResponseUser,
  PayloadGetUsers,
  { rejectValue: string }
>("auth/get-list", async (payload, { rejectWithValue }) => {
  try {
    const res = await httpRequest.get<ResponseUser>("/v1/users", {
      params: payload,
    });
    return {
      data: res.data,
      pagination: (res as any).pagination,
    } as any;
  } catch (e) {
    return rejectWithValue(getAxiosMessage(e, "Get all users failed"));
  }
});

export const deleteUser = async (userId: string): Promise<boolean> => {
  if (!userId) return false;
  const res = await httpRequest.delete<any>(`/v1/users/${userId}`);
  return res.data as boolean;
};
