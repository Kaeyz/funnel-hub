import { BadgeCheckIcon } from "lucide-vue-next";
import type { AppBadgeConfig } from "../common/app-badge.vue";
import type { FormSectionStatus } from "@/services/types/form-section.type";

export const formSectionBadgeConfig: AppBadgeConfig<FormSectionStatus> = {
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
