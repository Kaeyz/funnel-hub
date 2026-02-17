import { requestHandler } from "../config/http-client";
import type { Paginated } from "./types/common.type";
import type {
  Question,
  QuestionBody,
  QuestionError,
  QuestionQuery,
  QuestionStatus,
  QuestionStatusBody,
} from "./types/question.type";

export const getQuestions = (query: QuestionQuery) => {
  return requestHandler<Paginated<Question>, null, null, QuestionQuery>({
    path: "/questions",
    method: "get",
    query: query,
  });
};

export const createQuestion = (body: QuestionBody) => {
  return requestHandler<Question, QuestionError, QuestionBody, null>({
    path: "/questions",
    method: "post",
    body: body,
  });
};

export const updateQuestion = (id: string, body: QuestionBody) => {
  return requestHandler<Question, QuestionError, QuestionBody, null>({
    path: `/questions/${id}`,
    method: "put",
    body: body,
  });
};

export const updateQuestionStatus = (id: string, status: QuestionStatus) => {
  return requestHandler<Question, null, QuestionStatusBody, null>({
    path: `/questions/${id}/status`,
    method: "patch",
    body: { status },
  });
};
