<script setup lang="ts">
import { toast } from "vue-sonner";
import AppSheet from "../common/app-sheet.vue";
import TextInput from "../common/inputs/text-input.vue";
import { reactive } from "vue";
import { Button } from "../ui/button";
import { useApi } from "@/composables/useApi";
import { FieldGroup } from "../ui/field";
import type { Question, QuestionType } from "@/services/types/question.type";
import { updateQuestion } from "@/services/questions";
import { questionRequiredOptions, questionTypeOptions } from "./form-question-helpers";
import SelectInput from "../common/inputs/select-input.vue";

const props = defineProps<{
  formId: string;
  sectionId: string;
  data: Question;
  open: boolean;
  toggleDrawer: () => void;
  refreshForms: () => void;
}>();

const title = "Edit Question";
const description = "Fill to update question";

const formData = reactive({
  key: props.data.key,
  order: props.data.order.toString(),
  description: props.data.description,
  label: props.data.label,
  type: props.data.type,
  required: props.data.validation.required ? "true" : "false",
  min: props.data.validation.min.toString(),
  max: props.data.validation.max.toString(),
});

const error = reactive({
  key: "",
  order: "",
  description: "",
  label: "",
  type: "",
  required: "",
  min: "",
  max: "",
});

const clearForm = () => {
  formData.key = "";
  formData.order = "";
  formData.description = "";
  formData.label = "";
  formData.required = "";
  formData.min = "";
  formData.max = "";
};

const { loading, execute } = useApi({
  fn: updateQuestion,
  onSuccess: (msg) => {
    props.refreshForms();
    props.toggleDrawer();
    clearForm();
    toast.success(msg);
  },
  onError: (msg, v) => {
    toast.error(msg);
    error.key = v?.key;
    error.order = v?.order;
    error.description = v?.description;
    error.label = v?.label;
    error.type = v?.type;
    error.required = v?.validation.required;
    error.min = v?.validation.min;
    error.max = v?.validation.max;
  },
});

const handleSubmit = () => {
  if (!formData.order || !formData.key || !formData.order) {
    toast.error("Input validation error");
    return;
  }
  execute(props.data._id, {
    formSectionId: props.sectionId,
    label: formData.label,
    key: formData.key,
    order: +formData.order,
    description: formData.description,
    type: formData.type as QuestionType,
    validation: {
      required: formData.required === "true",
      min: +formData.min,
      max: +formData.max,
    },
  });
};
</script>

<template>
  <AppSheet :open="props.open" :toggle-drawer="props.toggleDrawer" :title="title" :description="description">
    <form @submit.prevent="handleSubmit">
      <FieldGroup class="grid gap-4">
        <TextInput id="key" v-model="formData.key" label="Key" placeholder="Enter key" required />
        <TextInput id="label" v-model="formData.label" label="Label" placeholder="Enter label" required />
        <TextInput id="order" v-model="formData.order" label="Order" placeholder="Enter order" type="number" required />
        <TextInput id="description" v-model="formData.description" label="Description" placeholder="Enter description" required />
        <SelectInput
          v-model="formData.type"
          label="Type"
          :options="questionTypeOptions"
          placeholder="Select type"
          class="w-full"
        />
        <SelectInput
          v-model="formData.required"
          label="Required"
          :options="questionRequiredOptions"
          placeholder="Select required"
          class="w-full"
        />
        <TextInput id="min" v-model="formData.min" label="Min" placeholder="Enter Min" type="number" required />
        <TextInput id="max" v-model="formData.max" label="Max" placeholder="Enter max" type="number" required />
        <Button type="submit" :loading="loading">Submit</Button>
      </FieldGroup>
    </form>
  </AppSheet>
</template>
