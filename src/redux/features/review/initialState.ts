import type { Media } from "~/types/common";
import type { Review, ReviewRecent } from "~/types/review";
import type { SortByValue } from "../restaurant/initialState";

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export type ReviewState = {
  loading: boolean;
  reviewsRecent: ReviewRecent[];
  loadingRecent: boolean;
  reviewsRestaurantDetail: ReviewRecent[];
  pagination: Pagination;
  isLoadingMore: boolean;
};
export type ReviewResponse = {
  data: Review[];
  pagination: Pagination;
};

export type PayloadGetReviewByRestaurant = {
  restaurantId: string;
  page?: number;
  limit?: number;
  sortOrder?: "asc" | "desc";
  sortBy?: Omit<SortByValue, "name">;
  rating?: number;
};
export type PayloadCreateReview = {
  user_id: string;
  restaurant_id: string;
  rating: number;
  content: string;
  media?: Media[];
};

export const reviewReducer: ReviewState = {
  loading: false,
  reviewsRecent: [],
  loadingRecent: false,
  reviewsRestaurantDetail: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  isLoadingMore: false,
};
