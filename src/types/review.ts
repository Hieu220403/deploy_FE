import type { Media } from "./common";

export type Review = {
  _id: string;
  content: string;
  rating: number;
  media: Media[];
  created_at: string;
  updated_at: string;
  restaurant: {
    _id: string;
    name: string;
    avatar: string;
  };
  user: {
    _id: string;
    name: string;
    username: string;
    avatar: string;
  };
};

export type ReviewRecent = Review & {
  restaurant: {
    _id: string;
    name: string;
    avatar: string;
  };
};
