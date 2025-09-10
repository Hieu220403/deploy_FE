/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import httpRequest from "~/services/httpRequest";
import type { Media } from "~/types/common";
import type { Restaurant } from "~/types/restautant";
import { getAxiosMessage } from "~/utils/error";

export const createMenu = createAsyncThunk<any, any, { rejectValue: string }>(
  "menu/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { restaurant_id, menu } = payload;
      const { data } = await httpRequest.post<any>(
        `/v1/menu/${restaurant_id}`,
        menu,
      );
      return data;
    } catch (e) {
      return rejectWithValue(getAxiosMessage(e, "Create restaurant failed"));
    }
  },
);

export const updateMenu = createAsyncThunk<
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

export const deleteMenu = createAsyncThunk<
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

export const uploadImageMenu = createAsyncThunk<
  Media,
  File,
  { rejectValue: string }
>("restaurant/upload", async (file, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await httpRequest.post<Media>(`/v1/menu/uploads`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (e) {
    return rejectWithValue(getAxiosMessage(e, "Upload image failed"));
  }
});
