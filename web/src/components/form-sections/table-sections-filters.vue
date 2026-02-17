<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import SelectInput from "../common/inputs/select-input.vue";
import { ref } from "vue";
import { Button } from "../ui/button";
import AddForm from "./add-form-sections.vue";
import type { FormSectionStatus } from "@/services/types/form-section.type";

defineProps<{
  formId: string;
  refreshForms: () => void;
  handleStatusChange: () => void;
  status: FormSectionStatusFilter;
}>();

export type FormSectionStatusFilter = FormSectionStatus | "all";

const statusOptions: { label: string; value: FormSectionStatusFilter }[] = [
  { label: "All", value: "all" },
  { label: "Draft", value: "draft" },
  { label: "Active", value: "active" },
  { label: "Archived", value: "archived" },
];

const open = ref(false);
const toggleDrawer = () => (open.value = !open.value);
</script>

<template>
  <div class="flex gap-2">
    <SelectInput
      :v-model="status"
      :options="statusOptions"
      placeholder="Status"
      class="w-40"
      @update:model-value="handleStatusChange"
    />
    <Button @click="toggleDrawer">
      <Plus />
      <span class="hidden lg:inline">Add Form</span>
    </Button>
    <AddForm :open="open" :toggle-drawer="toggleDrawer" :refresh-forms="refreshForms" :form-id="formId" />
  </div>
</template>
