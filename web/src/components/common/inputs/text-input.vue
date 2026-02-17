<script setup lang="ts">
import { computed } from "vue";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const props = defineProps<{
  modelValue?: string;
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const onKeyPress = (e: KeyboardEvent) => {
  if (props.type === "number" && !/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
};

const model = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});
</script>

<template>
  <Field class="gap-1">
    <FieldLabel :for="id">{{ label }}</FieldLabel>
    <Input
      :id="id"
      v-model="model"
      :type="type === 'number' ? 'text' : type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      @keypress="onKeyPress"
    />
  </Field>
</template>
