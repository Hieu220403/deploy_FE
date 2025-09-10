/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import httpRequest from "~/services/httpRequest";
import type { Review, ReviewRecent } from "~/types/review";
import { getAxiosMessage } from "~/utils/error";
import type {
  PayloadCreateReview,
  PayloadGetReviewByRestaurant,
  ReviewResponse,
} from "./initialState";
import type { Media } from "~/types/common";

export const getReviewsRecent = createAsyncThunk<
  ReviewRecent[],
  void,
  { rejectValue: string }
>("review/recent", async (_, { rejectWithValue }) => {
  try {
    const { data } =
      await httpRequest.get<ReviewRecent[]>("/v1/reviews/recent");
    return data;
  } catch (e) {
    return rejectWithValue(getAxiosMessage(e, "Fetch featured review failed"));
  }
});

export const getReviewsByRestaurant = createAsyncThunk<
  ReviewResponse,
  PayloadGetReviewByRestaurant,
  { rejectValue: string }
>("review/restaurant-detail", async (payload, { rejectWithValue }) => {
  try {
    const res = await httpRequest.get<ReviewRecent[]>(
      `/v1/reviews/${payload.restaurantId}`,
      {
        params: payload,
      },
    );
    return {
      data: res.data,
      pagination: (res as any).pagination,
    } as any;
  } catch (e) {
    return rejectWithValue(
      getAxiosMessage(e, "Fetch review by restaurant id failed"),
    );
  }
});

export const uploadMediaReview = async (restaurantId: string, file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await httpRequest.post<Media>(
      `/v1/reviews/upload/${restaurantId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createReview = createAsyncThunk<
  Review,
  PayloadCreateReview,
  { rejectValue: string }
>("review/create", async (payload, { rejectWithValue }) => {
  try {
    const { restaurant_id, ...restBody } = payload;
    const res = await httpRequest.post<Review>(
      `/v1/reviews/${restaurant_id}`,
      restBody,
    );
    return res.data;
  } catch (e) {
    return rejectWithValue(
      getAxiosMessage(e, "Fetch review by restaurant id failed"),
    );
  }
});
