import { requestHandler } from "../config/http-client";
import type { Paginated } from "./types/common.type";
import type {
  FormSection,
  FormSectionBody,
  FormSectionError,
  FormSectionQuery,
  FormSectionStatus,
  FormSectionStatusBody,
} from "./types/form-section.type";

export const getFormSections = (query: FormSectionQuery) => {
  return requestHandler<Paginated<FormSection>, null, null, FormSectionQuery>({
    path: "/form-sections",
    method: "get",
    query: query,
  });
};

export const createFormSection = (body: FormSectionBody) => {
  return requestHandler<FormSection, FormSectionError, FormSectionBody, null>({
    path: "/form-sections",
    method: "post",
    body: body,
  });
};

export const updateFormSection = (id: string, body: FormSectionBody) => {
  return requestHandler<FormSection, FormSectionError, FormSectionBody, null>({
    path: `/form-sections/${id}`,
    method: "put",
    body: body,
  });
};

export const updateFormSectionStatus = (id: string, status: FormSectionStatus) => {
  return requestHandler<FormSection, null, FormSectionStatusBody, null>({
    path: `/form-sections/${id}/status`,
    method: "patch",
    body: { status },
  });
};
