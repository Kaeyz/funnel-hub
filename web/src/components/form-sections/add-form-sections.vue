<script setup lang="ts">
import { toast } from "vue-sonner";
import AppSheet from "../common/app-sheet.vue";
import TextInput from "../common/inputs/text-input.vue";
import { reactive } from "vue";
import { Button } from "../ui/button";
import { createFormSection } from "@/services/form-sections";
import { useApi } from "@/composables/useApi";
import { FieldGroup } from "../ui/field";

const props = defineProps<{
  formId: string;
  open: boolean;
  toggleDrawer: () => void;
  refreshForms: () => void;
}>();

const title = "New Form Section";
const description = "Fill to add a new form section";

const formData = reactive({
  name: "",
  key: "",
  order: "0",
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
  fn: createFormSection,
  onSuccess: (msg) => {
    props.refreshForms();
    props.toggleDrawer();
    clearForm();
    toast.success(msg);
  },
  onError: (msg, v) => {
    toast.error(msg);
    error.name = v?.name;
    error.key = v?.key;
    error.order = v?.order;
  },
});

const handleSubmit = () => {
  if (!formData.name || !formData.key || !formData.order) {
    toast.error("Input validation error");
    return;
  }
  execute({
    name: formData.name,
    key: formData.key,
    order: +formData.order,
    formId: props.formId,
  });
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
