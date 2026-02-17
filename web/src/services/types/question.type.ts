import type { SortDir } from "./common.type";

export type QuestionStatus = "draft" | "active" | "archived";
export type QuestionType = "text" | "number" | "file";
export type QuestionValidation = {
  required: boolean;
  min: number;
  max: number;
};

export type Question = {
  _id: string;
  formSectionId: string;
  key: string;
  order: number;
  description: string;
  label: string;
  type: QuestionType;
  status: QuestionStatus;
  validation: QuestionValidation;
  createdAt: string;
  updatedAt: string;
};

export type QuestionError = {
  formSectionId: string;
  key: string;
  order: string;
  description: string;
  label: string;
  type: string;
  validation: {
    required: string;
    min: string;
    max: string;
  };
};

export type QuestionBody = {
  formSectionId: string;
  key: string;
  order: number;
  description: string;
  label: string;
  type: QuestionType;
  validation: QuestionValidation;
};

export type QuestionStatusBody = {
  status: QuestionStatus;
};

export type QuestionQuery = {
  formSectionId: string;
  questionIds?: string[];
  search?: string;
  page?: number;
  limit?: number;
  status?: QuestionStatus;
  type?: QuestionType;
  sortDir?: SortDir;
  sortKey?: string;
};
