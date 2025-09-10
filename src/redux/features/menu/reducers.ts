import { createReducer } from "@reduxjs/toolkit";
import { createMenu, uploadImageMenu } from "./actions";
import { menuReducer } from "./initialState";

const authReducer = createReducer(menuReducer, (builder) =>
  builder
    .addCase(createMenu.pending, (state) => {
      state.loadingMenu = true;
    })
    .addCase(createMenu.fulfilled, (state) => {
      state.loadingMenu = false;
    })
    .addCase(createMenu.rejected, (state) => {
      state.loadingMenu = false;
    })
    .addCase(uploadImageMenu.pending, (state) => {
      state.loadingUploadImage = true;
    })
    .addCase(uploadImageMenu.fulfilled, (state) => {
      state.loadingUploadImage = false;
    })
    .addCase(uploadImageMenu.rejected, (state) => {
      state.loadingUploadImage = false;
    }),
);
export default authReducer;
