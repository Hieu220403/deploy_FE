import type { AxiosError } from "axios";

export function getAxiosMessage(error: unknown, fallback = "Request failed") {
  const err = error as AxiosError<{ message?: string }>;
  return err.response?.data?.message || err.message || fallback;
}
