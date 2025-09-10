import config from "~/configs";
import { AdminLayout, AuthLayout, DefaultLayout } from "~/Layouts";
import {
  Forbidden,
  Home,
  ListRestaurant,
  NotFound,
  SignIn,
  SignUp,
  ForgotPassword,
  ResetPassword,
  Restaurants,
  RestaurantDetail,
} from "~/pages";
import CreateRestaurant from "~/pages/Admin/Restaurant/CreateRestaurant";
import CreateUser from "~/pages/Admin/User/CreateUser";
import EditUser from "~/pages/Admin/User/EditUser";
import ListUser from "~/pages/Admin/User/ListUser";
import Profile from "~/pages/Profile";
import ServerError from "~/pages/ServerError";
import type { Route } from "~/types/route";

const publicRoutes: Route[] = [
  { path: config.routes.notFound, component: NotFound, layout: null },
  { path: config.routes.forbidden, component: Forbidden, layout: null },
  { path: config.routes.serverError, component: ServerError, layout: null },
  { path: config.routes.signIn, component: SignIn, layout: AuthLayout },
  { path: config.routes.signUp, component: SignUp, layout: AuthLayout },
  {
    path: config.routes.forgotPassword.request,
    component: ForgotPassword,
    layout: AuthLayout,
  },
  {
    path: config.routes.resetPassword,
    component: ResetPassword,
    layout: AuthLayout,
  },
  {
    path: config.routes.restaurants.list,
    component: Restaurants,
    layout: DefaultLayout,
  },
  {
    path: config.routes.restaurants.detail,
    component: RestaurantDetail,
    layout: DefaultLayout,
  },
];
const privateRoutes: Route[] = [
  { path: config.routes.home, component: Home, layout: DefaultLayout },
  {
    path: config.routes.admin.dashboard,
    component: ListRestaurant,
    layout: AdminLayout,
  },
  { path: config.routes.profile, component: Profile, layout: DefaultLayout },
  {
    path: config.routes.admin.restaurants.list,
    component: ListRestaurant,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.restaurants.create,
    component: CreateRestaurant,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.users.list,
    component: ListUser,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.users.create,
    component: CreateUser,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.users.edit,
    component: EditUser,
    layout: AdminLayout,
  },
  {
    path: config.routes.admin.reviews,
    component: ListRestaurant,
    layout: AdminLayout,
  },
];

export { privateRoutes, publicRoutes };
