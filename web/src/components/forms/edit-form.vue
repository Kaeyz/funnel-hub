<script setup lang="ts">
import { toast } from "vue-sonner";
import AppSheet from "../common/app-sheet.vue";
import TextInput from "../common/inputs/text-input.vue";
import { reactive } from "vue";
import { Button } from "../ui/button";
import { updateForm } from "@/services/forms";
import { useApi } from "@/composables/useApi";
import { FieldGroup } from "../ui/field";
import type { Form } from "@/services/types/form.type";

const props = defineProps<{
  data: Form;
  open: boolean;
  toggleDrawer: () => void;
  refreshForms: () => void;
}>();

const title = "Edit new Form";
const description = "Fill to update form";

const formData = reactive({
  name: props.data.name,
  key: props.data.key,
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
  fn: updateForm,
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
  execute(props.data._id, { name: formData.name, key: formData.key });
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
