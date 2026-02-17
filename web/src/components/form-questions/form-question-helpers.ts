import { BadgeCheckIcon } from "lucide-vue-next";
import type { AppBadgeConfig } from "../common/app-badge.vue";
import type { QuestionStatus, QuestionType } from "@/services/types/question.type";

export const questionBadgeConfig: AppBadgeConfig<QuestionStatus> = {
  draft: {
    label: "Draft",
    variant: "outline",
  },
  active: {
    label: "Active",
    variant: "secondary",
    class: "bg-blue-500 text-white dark:bg-blue-600",
    icon: BadgeCheckIcon,
  },
  archived: {
    label: "Archived",
    variant: "destructive",
  },
};

export type QuestionStatusFilter = QuestionStatus | "all";
export const statusOptions: { label: string; value: QuestionStatusFilter }[] = [
  { label: "All", value: "all" },
  { label: "Draft", value: "draft" },
  { label: "Active", value: "active" },
  { label: "Archived", value: "archived" },
];

export const questionTypeOptions: { label: string; value: QuestionType }[] = [
  { label: "Text", value: "text" },
  { label: "Number", value: "number" },
  { label: "File", value: "file" },
];

export type QuestionRequired = "true" | "false";
export const questionRequiredOptions: { label: string; value: QuestionRequired }[] = [
  { label: "True", value: "true" },
  { label: "False", value: "false" },
];
