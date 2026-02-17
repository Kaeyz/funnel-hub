import type { SortDir } from "./common.type";

export type Lead = {
  _id: string;
  formId: string;
  userName: string;
  formData: Record<string, string>;
  formStructure: Record<string, string[]>;
  createdAt: string;
  updatedAt: string;
};

export type LeadError = {
  formId: string;
  userName: string;
  formData: string;
  formStructure: string;
};

export type LeadBody = {
  formId: string;
  userName: string;
  formData: Record<string, string>;
  formStructure: Record<string, string[]>;
};

export type LeadQuery = {
  search?: string;
  page?: number;
  limit?: number;
  sortDir?: SortDir;
  sortKey?: string;
};
