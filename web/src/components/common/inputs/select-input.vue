<script setup lang="ts">
import { computed } from "vue";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";

type SelectOption = {
  label: string;
  value: string;
};

const props = defineProps<{
  id?: string;
  label?: string;
  modelValue?: string;
  options: SelectOption[];
  placeholder?: string;
  class?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const selected = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});
</script>

<template>
  <Field class="flex gap-0">
    <FieldLabel :for="id" class="mb-1">{{ label }}</FieldLabel>

    <Select v-model="selected">
      <SelectTrigger :id="id" class="w-full cursor-pointer">
        <SelectValue :placeholder="placeholder ?? 'Select option'" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectItem v-for="option in options" :key="option.value" :value="option.value" class="cursor-pointer">
            {{ option.label }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </Field>
</template>
