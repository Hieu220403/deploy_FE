import { createReducer } from "@reduxjs/toolkit";
import {
  getFeaturedRestaurants,
  getRestaurantDetail,
  getRestaurants,
  setPage,
  updateRatingRestaurant,
  uploadImageRes,
} from "./actions";
import { restaurantReducer } from "./initialState";

const authReducer = createReducer(
  restaurantReducer,
  (builder) =>
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
      })
      .addCase(updateRatingRestaurant, (state, { payload: rating }) => {
        if (!state.restaurant) return;

        const prevAvg = state.restaurant.rating ?? 0;
        const prevTotal = state.restaurant.total_reviews ?? 0;

        const newTotal = prevTotal + 1;
        const newAvgRating = (prevAvg * prevTotal + Number(rating)) / newTotal;

        state.restaurant.rating = newAvgRating; // (nếu muốn làm tròn thì .toFixed khi HIỂN THỊ)
        state.restaurant.total_reviews = newTotal;
      }),
  // .addCase(updateRatingRestaurant, (state, { payload }) => {
  //   if (state.restaurant == null) return;
  //   const newTotal = state.restaurant!.total_reviews + 1;
  //   const newAvgRating =
  //     (state.restaurant!.rating ||
  //       0 * state.restaurant!.total_reviews + payload) / newTotal;
  //   state.restaurant!.rating = newAvgRating;
  //   state.restaurant!.total_reviews = newTotal;
  // }),
);
export default authReducer;
