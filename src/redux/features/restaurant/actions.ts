/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import httpRequest from "~/services/httpRequest";
import type { Restaurant } from "~/types/restautant";
import { getAxiosMessage } from "~/utils/error";
import type { Pagination, PayloadGetRestaurant } from "./initialState";
import type { Media } from "~/types/common";

export const getFeaturedRestaurants = createAsyncThunk<
  Restaurant[],
  void,
  { rejectValue: string }
>("restaurant/featured", async (_, { rejectWithValue }) => {
  try {
    const { data } = await httpRequest.get<Restaurant[]>(
      "/v1/restaurants/featured",
    );
    return data;
  } catch (e) {
    return rejectWithValue(
      getAxiosMessage(e, "Fetch featured restaurants failed"),
    );
  }
});

type RestaurantResponse = {
  data: Restaurant[];
  pagination: Pagination;
};

export const getRestaurants = createAsyncThunk<
  RestaurantResponse,
  PayloadGetRestaurant,
  { rejectValue: string }
>("restaurant/list", async (payload, { rejectWithValue }) => {
  try {
    const res = await httpRequest.get<RestaurantResponse>("/v1/restaurants", {
      params: payload,
    });
    return {
      data: res.data,
      pagination: (res as any).pagination,
    } as any;
  } catch (e) {
    return rejectWithValue(
      getAxiosMessage(e, "Lấy danh sách nhà hàng thất bại"),
    );
  }
});

export const setPage = createAction<number>("restaurant/setPage");

export const getRestaurantDetail = createAsyncThunk<
  Restaurant | null,
  string,
  { rejectValue: string }
>("restaurant/detail", async (id, { rejectWithValue }) => {
  try {
    const { data } = await httpRequest.get<Restaurant | null>(
      `/v1/restaurants/${id}`,
    );
    return data;
  } catch (e) {
    return rejectWithValue(
      getAxiosMessage(e, "Fetch featured restaurants failed"),
    );
  }
});

export const createRes = createAsyncThunk<
  Restaurant,
  Partial<Restaurant>,
  { rejectValue: string }
>("restaurant/create", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await httpRequest.post<Restaurant>(
      `/v1/restaurants`,
      payload,
    );
    return data;
  } catch (e) {
    return rejectWithValue(getAxiosMessage(e, "Create restaurant failed"));
  }
});

export const updateRes = createAsyncThunk<
  Restaurant,
  { id: string } & Partial<Restaurant>,
  { rejectValue: string }
>("restaurant/update", async (payload, { rejectWithValue }) => {
  try {
    const { id, ...body } = payload;
    const { data } = await httpRequest.put<Restaurant>(
      `/v1/restaurants/${id}`,
      body,
    );
    return data;
  } catch (e) {
    return rejectWithValue(getAxiosMessage(e, "Update restaurant failed"));
  }
});

export const deleteRes = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("restaurant/delete", async (id, { rejectWithValue }) => {
  try {
    await httpRequest.delete(`/v1/restaurants/${id}`);
    return id;
  } catch (e) {
    return rejectWithValue(getAxiosMessage(e, "Delete restaurant failed"));
  }
});

export const uploadImageRes = createAsyncThunk<
  Media,
  File,
  { rejectValue: string }
>("restaurant/upload-image", async (file, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await httpRequest.post<Media>(
      `/v1/restaurants/uploads`,
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
    return rejectWithValue("Upload image failed");
  }
});
export const updateRatingRestaurant = createAction<number>(
  "restaurant/update-rating",
);
