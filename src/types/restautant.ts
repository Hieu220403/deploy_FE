import type { Media } from "./common";

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
export interface WeeklyOpeningHours {
  day_of_week: DayOfWeek;
  open: string;
  close: string;
}
export interface SpecialOpeningDay {
  date: Date;
  open: string;
  close: string;
  note: string;
}
export interface Restaurant {
  _id: string;
  name: string;
  avatar: string;
  description: string;
  address: string;
  phone_number: string;
  rating: number;
  total_reviews: number;
  weekly_opening_hours: WeeklyOpeningHours[];
  special_opening_days: SpecialOpeningDay[];
  website: string | null;
  media: Media[];
  created_at: Date;
  updated_at: Date;
  bookmarks: {
    _id: string;
    user_id: string;
    restaurant_id: string;
    created_at: string;
    updated_at: string;
  }[];
  menus: {
    _id: string;
    restaurant_id: string;
    name: string;
    description: string;
    price: string;
    media: Media[];
    created_at: Date | null;
    updated_at: Date | null;
  }[];
}
