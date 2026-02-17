<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import SelectInput from "../common/inputs/select-input.vue";
import { ref } from "vue";
import { Button } from "../ui/button";
import AddQuestion from "./add-questions.vue";
import { statusOptions, type QuestionStatusFilter } from "./form-question-helpers";

defineProps<{
  formId: string;
  sectionId: string;
  refreshForms: () => void;
  handleStatusChange: () => void;
  status: QuestionStatusFilter;
}>();

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
      <span class="hidden lg:inline">Add Question</span>
    </Button>
  </div>
  <AddQuestion
    :open="open"
    :toggle-drawer="toggleDrawer"
    :refresh-forms="refreshForms"
    :form-id="formId"
    :section-id="sectionId"
  />
</template>
