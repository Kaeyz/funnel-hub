import type { SortDir } from "./common.type";

export type FormSectionStatus = "draft" | "active" | "archived";

export type FormSection = {
  _id: string;
  formId: string;
  name: string;
  key: string;
  order: number;
  status: FormSectionStatus;
  createdAt: string;
  updatedAt: string;
};

export type FormSectionError = {
  name: string;
  key: string;
  order: string;
};

export type FormSectionBody = {
  formId: string;
  name: string;
  key: string;
  order: number;
};

export type FormSectionStatusBody = {
  status: FormSectionStatus;
};

export type FormSectionQuery = {
  formId: string;
  formSectionIds?: string[];
  search?: string;
  page?: number;
  limit?: number;
  status?: FormSectionStatus;
  sortDir?: SortDir;
  sortKey?: string;
};
