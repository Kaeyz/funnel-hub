import type { FormAnswer } from "@/lib/index-db/index-db-service";
import { requestHandler, type ApiResponse } from "../config/http-client";
import type { Paginated } from "./types/common.type";
import type { Lead, LeadBody, LeadError, LeadQuery } from "./types/lead.type";

export const getLeads = (query: LeadQuery) => {
  return requestHandler<Paginated<Lead>, null, null, LeadQuery>({
    path: "/leads",
    method: "get",
    query: query,
  });
};

export const getLead = (leadId: string) => {
  return requestHandler<Lead, null, null, null>({
    path: `/leads/${leadId}`,
    method: "get",
  });
};

export const createLead = (body: LeadBody) => {
  return requestHandler<Lead, LeadError, LeadBody, null>({
    path: "/leads",
    method: "post",
    body: body,
  });
};

export const uploadFile = (data: FormData) => {
  return requestHandler({
    path: "/upload",
    method: "post",
    body: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const submitLeadData = async (
  formData: Record<string, FormAnswer>,
  formStructure: Record<string, string[]>,
  formId: string,
  userName: string
): Promise<ApiResponse<Lead, LeadError>> => {
  const allAnswers = Object.values(formData);
  const normalAnswers = allAnswers
    .filter((a) => a.type !== "file")
    .reduce<Record<string, string>>((acc, a) => {
      acc[a.questionId] = String(a.value);
      return acc;
    }, {});

  const fileAnswers = allAnswers.filter((a) => a.type === "file" && a.value instanceof File);

  const leadBody = {
    formId,
    userName,
    formData: normalAnswers,
    formStructure,
  };

  const leadResponse = await createLead(leadBody);
  if (leadResponse.resType === "error") return leadResponse;

  const leadId = leadResponse.resData.data._id;
  await Promise.all(
    fileAnswers.map((fileAnswer) => {
      const file = fileAnswer.value as File;
      const formDataToSend = new FormData();
      formDataToSend.append("file", file);
      formDataToSend.append("leadId", leadId);
      formDataToSend.append("questionId", fileAnswer.questionId);
      return uploadFile(formDataToSend);
    })
  );

  return leadResponse;
};
