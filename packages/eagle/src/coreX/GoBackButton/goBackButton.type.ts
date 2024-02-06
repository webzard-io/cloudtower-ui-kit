import type { History, Location as HistoryLocation } from "history";

export type HistoryType = Omit<
  History,
  "push" | "replace" | "location" | "length"
> & {
  push: {
    (path: string, state?: HistoryLocation["state"]): void;
    (location: any): void;
  };
  replace: {
    (path: string, state?: HistoryLocation["state"]): void;
    (location: any): void;
  };
};

export type GoBackButtonType = {
  history: History | HistoryType;
  title?: string;
  onClick?: () => void;
  path?: string;
  index?: number;
};
