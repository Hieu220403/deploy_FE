import type { Restaurant } from "~/types/restautant";

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}
export type RestaurantState = {
  featuredRestaurants: Restaurant[];
  restaurant: Restaurant | null;
  loading: boolean;
  loadingUpload: boolean;
  restaurants: Restaurant[];
  pagination: Pagination;
};
export type SortByValue = "name" | "rating" | "created_at";

export type SortOption = {
  label: string;
  value: SortByValue;
  order: "asc" | "desc";
};
export interface PayloadGetRestaurant {
  page?: number;
  limit?: number;
  search?: string | null;
  sortOrder?: "asc" | "desc";
  sortBy?: SortByValue;
  rating?: number;
}

export const restaurantReducer: RestaurantState = {
  featuredRestaurants: [],
  restaurant: null,
  loading: false,
  loadingUpload: false,
  restaurants: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};
