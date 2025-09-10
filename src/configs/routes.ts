const routes = {
  home: "/",
  signUp: "/sign-up",
  signIn: "/sign-in",
  restaurants: {
    list: "/restaurants",
    detail: "/restaurants/:id",
  },
  forgotPassword: {
    request: "/forgot-password",
  },
  resetPassword: "/reset-password",
  admin: {
    path: "/admin",
    restaurants: {
      list: "/admin/restaurants",
      create: "/admin/restaurants/create",
      detail: "/admin/restaurants/:id",
    },
    users: {
      list: "/admin/users",
      create: "/admin/users/create",
      edit: "/admin/users/:id/edit",
    },
    reviews: "/admin/reviews",
    dashboard: "/admin/dashboard",
  },
  profile: "/profile",
  forbidden: "/forbidden",
  serverError: "/server-error",
  notFound: "*",
};
export default routes;
