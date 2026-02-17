<script setup lang="ts">
import { computed } from "vue";

export type FileValue =
  | string
  | {
      url: string;
      name?: string;
      type?: string;
    }
  | null
  | undefined;

const props = defineProps<{
  file: FileValue;
  label?: string;
}>();

const fileData = computed(() => {
  if (!props.file) return null;

  if (typeof props.file === "string") {
    return {
      url: props.file,
      name: props.file.split("/").pop() ?? "File",
      type: undefined,
    };
  }

  return props.file;
});

const isImage = computed(() => {
  if (!fileData.value) return false;

  if (fileData.value.type) {
    return fileData.value.type.startsWith("image/");
  }

  return /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(fileData.value.url);
});

const isPdf = computed(() => {
  if (!fileData.value) return false;

  if (fileData.value.type) {
    return fileData.value.type === "application/pdf";
  }

  return /\.pdf$/i.test(fileData.value.url);
});
</script>

<template>
  <div class="space-y-2">
    <label v-if="label" class="font-medium text-sm text-gray-700">
      {{ label }}
    </label>
    <div v-if="!fileData" class="text-sm text-gray-400 border rounded p-3 bg-gray-50">No file uploaded</div>

    <div v-else class="border rounded-lg p-3 bg-white shadow-sm space-y-3">
      <img v-if="isImage" :src="fileData.url" :alt="fileData.name" class="max-w-xs rounded border" />

      <iframe v-else-if="isPdf" :src="fileData.url" class="w-full h-72 rounded border" />

      <div v-else>
        <a :href="fileData.url" target="_blank" rel="noopener noreferrer" class="text-primary underline break-all">
          Download {{ fileData.name }}
        </a>
      </div>
      <p class="text-xs text-gray-500 break-all">
        {{ fileData.name }}
      </p>
    </div>
  </div>
</template>
