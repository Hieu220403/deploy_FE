
export type MenuState = {
  loadingMenu: boolean;
  loadingUploadImage: boolean;
};

export const menuReducer: MenuState = {
  loadingMenu: false,
  loadingUploadImage: false,
};
