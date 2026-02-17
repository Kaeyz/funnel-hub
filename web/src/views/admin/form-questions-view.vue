<script setup lang="ts">
import FormQuestionsTable from "@/components/form-questions/form-questions-table.vue";

import { useRoute } from "vue-router";
const route = useRoute();
const formId = route.params.formId as string;
const sectionId = route.params.sectionId as string;
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Form Questions</h1>
    <p>View and Manage Form Questions</p>
  </div>
  <div>
    <FormQuestionsTable :form-id="formId" :section-id="sectionId" />
  </div>
</template>
