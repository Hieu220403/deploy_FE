import type { ComponentType, ReactElement } from "react";

export type Route = {
  path: string;
  component: ComponentType;
  layout: ComponentType<{ children: ReactElement }> | null | null;
  isAdmin?: boolean;
};
