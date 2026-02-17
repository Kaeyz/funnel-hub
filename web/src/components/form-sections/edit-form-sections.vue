<script setup lang="ts">
import { toast } from "vue-sonner";
import AppSheet from "../common/app-sheet.vue";
import TextInput from "../common/inputs/text-input.vue";
import { reactive } from "vue";
import { Button } from "../ui/button";
import { useApi } from "@/composables/useApi";
import { FieldGroup } from "../ui/field";
import { updateFormSection } from "@/services/form-sections";
import type { FormSection } from "@/services/types/form-section.type";

const props = defineProps<{
  formId: string;
  data: FormSection;
  open: boolean;
  toggleDrawer: () => void;
  refreshForms: () => void;
}>();

const title = "Edit Form section";
const description = "Fill to update form section";

const formData = reactive({
  name: props.data.name,
  key: props.data.key,
  order: props.data.order.toString(),
});

const error = reactive({
  name: "",
  key: "",
  order: "",
});

const clearForm = () => {
  formData.name = "";
  formData.key = "";
  formData.order = "0";
};

const { loading, execute } = useApi({
  fn: updateFormSection,
  onSuccess: (msg) => {
    props.refreshForms();
    props.toggleDrawer();
    clearForm();
    toast.success(msg);
  },
  onError: (msg, v) => {
    toast.error(msg);
    error.key = v?.key;
    error.name = v?.name;
    error.order = v?.order;
  },
});

const handleSubmit = () => {
  if (!formData.name || !formData.key || !formData.order) {
    toast.error("Input validation error");
    return;
  }
  execute(props.data._id, { name: formData.name, key: formData.key, order: +formData.order, formId: props.formId });
};
</script>

<template>
  <AppSheet :open="props.open" :toggle-drawer="props.toggleDrawer" :title="title" :description="description">
    <form @submit.prevent="handleSubmit">
      <FieldGroup class="grid gap-4">
        <TextInput id="name" v-model="formData.name" label="Name" placeholder="Enter name" required />
        <TextInput id="key" v-model="formData.key" label="Key" placeholder="Enter key" required />
        <TextInput id="order" v-model="formData.order" label="Order" placeholder="Enter order" type="number" required />
        <Button type="submit" :loading="loading">Submit</Button>
      </FieldGroup>
    </form>
  </AppSheet>
</template>
