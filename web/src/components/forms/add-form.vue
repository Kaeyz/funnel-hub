<script setup lang="ts">
import { toast } from "vue-sonner";
import AppSheet from "../common/app-sheet.vue";
import TextInput from "../common/inputs/text-input.vue";
import { reactive } from "vue";
import { Button } from "../ui/button";
import { createForm } from "@/services/forms";
import { useApi } from "@/composables/useApi";
import { FieldGroup } from "../ui/field";

const props = defineProps<{
  open: boolean;
  toggleDrawer: () => void;
  refreshForms: () => void;
}>();

const title = "Add new Form";
const description = "fill for to add a new form";

const formData = reactive({
  name: "",
  key: "",
});

const error = reactive({
  name: "",
  key: "",
});

const clearForm = () => {
  formData.name = "";
  formData.key = "";
};

const { loading, execute } = useApi({
  fn: createForm,
  onSuccess: (msg) => {
    props.refreshForms();
    props.toggleDrawer();
    clearForm();
    toast.success(msg);
  },
  onError: (msg, v) => {
    toast.error(msg);
    error.key = v?.key;
    error.key = v?.key;
  },
});

const handleSubmit = () => {
  if (!formData.name || !formData.key) {
    toast.error("Please enter username and password.");
    return;
  }
  execute({ name: formData.name, key: formData.key });
};
</script>

<template>
  <AppSheet :open="props.open" :toggle-drawer="props.toggleDrawer" :title="title" :description="description">
    <form @submit.prevent="handleSubmit">
      <FieldGroup class="grid gap-4">
        <TextInput id="name" v-model="formData.name" label="Name" placeholder="Enter name" required />
        <TextInput id="key" v-model="formData.key" label="Key" placeholder="Enter key" required />
        <Button type="submit" :loading="loading">Submit</Button>
      </FieldGroup>
    </form>
  </AppSheet>
</template>
