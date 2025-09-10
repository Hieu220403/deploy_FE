import { createReducer } from "@reduxjs/toolkit";
import {
  clearAuth,
  forgotPassword,
  getListUser,
  getProfile,
  resetPassword,
  signIn,
  signUp,
  updateProfile,
  verifyForgotPasswordToken,
} from "./actions";
import { authStateReducer } from "./initialState";

const authReducer = createReducer(authStateReducer, (builder) =>
  builder
    .addCase(signIn.pending, (state) => {
      state.loading = true;
    })
    .addCase(signIn.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload.user;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
      }
      state.loading = false;
    })
    .addCase(signIn.rejected, (state) => {
      state.loading = false;
    })

    .addCase(signUp.pending, (state) => {
      state.loading = true;
    })
    .addCase(signUp.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(forgotPassword.pending, (state) => {
      state.loading = true;
    })
    .addCase(forgotPassword.fulfilled, (state, { payload }) => {
      state.forgotPasswordToken = payload;
      state.loading = false;
    })
    .addCase(forgotPassword.rejected, (state) => {
      state.loading = false;
    })
    .addCase(verifyForgotPasswordToken.pending, (state) => {
      state.loading = true;
    })
    .addCase(verifyForgotPasswordToken.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(verifyForgotPasswordToken.rejected, (state) => {
      state.loading = false;
    })
    .addCase(resetPassword.pending, (state) => {
      state.loading = true;
    })
    .addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(resetPassword.rejected, (state) => {
      state.loading = false;
    })
    .addCase(clearAuth, (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    })
    .addCase(getProfile.pending, (state) => {
      state.loading = true;
    })
    .addCase(getProfile.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload;
      }
      state.loading = false;
    })
    .addCase(getProfile.rejected, (state) => {
      state.loading = false;
    })
    .addCase(updateProfile.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = {
          ...state.user,
          ...payload,
        };
      }
      state.loading = false;
    })
    .addCase(getListUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(getListUser.fulfilled, (state, { payload }) => {
      if (payload) {
        state.users = payload.data;
        state.pagination = payload.pagination;
      }
      state.loading = false;
    })
    .addCase(getListUser.rejected, (state) => {
      state.loading = false;
    }),
);
export default authReducer;
