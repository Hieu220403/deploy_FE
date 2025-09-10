import { createReducer } from "@reduxjs/toolkit";
import {
  createReview,
  getReviewsByRestaurant,
  getReviewsRecent,
} from "./actions";
import { reviewReducer } from "./initialState";

const authReducer = createReducer(reviewReducer, (builder) =>
  builder
    .addCase(getReviewsRecent.pending, (state) => {
      state.loadingRecent = true;
    })
    .addCase(getReviewsRecent.fulfilled, (state, { payload }) => {
      if (payload) {
        state.reviewsRecent = payload;
      }
      state.loadingRecent = false;
    })
    .addCase(getReviewsRecent.rejected, (state) => {
      state.loadingRecent = false;
    })
    .addCase(getReviewsByRestaurant.pending, (state, action) => {
      const page = action.meta.arg.page ?? 1;
      if (page > 1) {
        state.isLoadingMore = true;
      } else {
        state.loading = true;
      }
    })
    .addCase(getReviewsByRestaurant.fulfilled, (state, { payload }) => {
      if (payload) {
        if (payload.pagination.page > 1) {
          state.reviewsRestaurantDetail = [
            ...state.reviewsRestaurantDetail,
            ...payload.data,
          ];
        } else {
          state.reviewsRestaurantDetail = payload.data;
        }
        state.pagination = payload.pagination;
      }
      state.loading = false;
      state.isLoadingMore = false;
    })
    .addCase(getReviewsByRestaurant.rejected, (state) => {
      state.loading = false;
      state.isLoadingMore = false;
    })
    .addCase(createReview.fulfilled, (state, { payload }) => {
      if (payload) {
        state.reviewsRestaurantDetail = [
          payload,
          ...state.reviewsRestaurantDetail,
        ];
        state.pagination.total += 1;
      }
    }),
);
export default authReducer;
