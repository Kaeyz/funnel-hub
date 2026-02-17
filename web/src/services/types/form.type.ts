import type { SortDir } from "./common.type";

export type FormStatus = "draft" | "active" | "archived";

export type Form = {
  _id: string;
  name: string;
  key: string;
  status: FormStatus;
  createdAt: string;
  updatedAt: string;
};

export type FormError = {
  name: string;
  key: string;
};

export type FormBody = {
  name: string;
  key: string;
};

export type FormStatusBody = {
  status: FormStatus;
};

export type FormQuery = {
  search?: string;
  page?: number;
  limit?: number;
  status?: FormStatus;
  sortDir?: SortDir;
  sortKey?: string;
};
