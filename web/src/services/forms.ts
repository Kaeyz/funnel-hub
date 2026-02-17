import { requestHandler } from "../config/http-client";
import type { Paginated } from "./types/common.type";
import type { Form, FormBody, FormError, FormQuery, FormStatus, FormStatusBody } from "./types/form.type";

export const getForms = (query: FormQuery) => {
  return requestHandler<Paginated<Form>, null, null, FormQuery>({
    path: "/forms",
    method: "get",
    query: query,
  });
};

export const createForm = (body: FormBody) => {
  return requestHandler<Form, FormError, FormBody, null>({
    path: "/forms",
    method: "post",
    body: body,
  });
};

export const updateForm = (id: string, body: FormBody) => {
  return requestHandler<Form, FormError, FormBody, null>({
    path: `/forms/${id}`,
    method: "put",
    body: body,
  });
};

export const updateFormStatus = (id: string, status: FormStatus) => {
  return requestHandler<Form, null, FormStatusBody, null>({
    path: `/forms/${id}/status`,
    method: "patch",
    body: { status },
  });
};
