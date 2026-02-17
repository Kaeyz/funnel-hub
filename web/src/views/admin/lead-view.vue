<script setup lang="ts">
import ViewLead from "@/components/leads/view-lead.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const leadId = route.params.leadId as string;
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Lead</h1>
    <p>View and Manage lead</p>
  </div>
  <div>
    <ViewLead :lead-id="leadId" />
  </div>
</template>
