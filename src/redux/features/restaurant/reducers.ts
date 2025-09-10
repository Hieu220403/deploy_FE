import { createReducer } from "@reduxjs/toolkit";
import {
  getFeaturedRestaurants,
  getRestaurantDetail,
  getRestaurants,
  setPage,
  uploadImageRes,
} from "./actions";
import { restaurantReducer } from "./initialState";

const authReducer = createReducer(restaurantReducer, (builder) =>
  builder
    .addCase(getFeaturedRestaurants.pending, (state) => {
      state.loading = true;
    })
    .addCase(getFeaturedRestaurants.fulfilled, (state, { payload }) => {
      if (payload) {
        state.featuredRestaurants = payload;
      }
      state.loading = false;
    })
    .addCase(getFeaturedRestaurants.rejected, (state) => {
      state.loading = false;
    })
    .addCase(getRestaurants.pending, (state) => {
      state.loading = true;
    })
    .addCase(getRestaurants.fulfilled, (state, { payload }) => {
      if (payload) {
        state.restaurants = payload.data;
        state.pagination = payload.pagination;
      }
      state.loading = false;
    })
    .addCase(getRestaurants.rejected, (state) => {
      state.loading = false;
    })
    .addCase(setPage, (state, { payload }) => {
      state.pagination.page = payload;
    })
    .addCase(getRestaurantDetail.pending, (state) => {
      state.loading = true;
    })
    .addCase(getRestaurantDetail.fulfilled, (state, { payload }) => {
      if (payload) {
        state.restaurant = payload;
      }
      state.loading = false;
    })
    .addCase(getRestaurantDetail.rejected, (state) => {
      state.loading = false;
    })
    .addCase(uploadImageRes.pending, (state) => {
      state.loadingUpload = true;
    })
    .addCase(uploadImageRes.fulfilled, (state) => {
      state.loadingUpload = false;
    })
    .addCase(uploadImageRes.rejected, (state) => {
      state.loadingUpload = false;
    }),
);
export default authReducer;
