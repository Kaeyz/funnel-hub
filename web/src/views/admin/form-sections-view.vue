<script setup lang="ts">
import FormSectionsTable from "@/components/form-sections/form-sections-table.vue";

import { useRoute } from "vue-router";
const route = useRoute();
const formId = route.params.formId as string;
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Form Sections</h1>
    <p>View and Manage Form Sections</p>
  </div>
  <div>
    <FormSectionsTable :form-id="formId" />
  </div>
</template>
