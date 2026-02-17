<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Leads</h1>
    <p>View and Manage all leads</p>
  </div>
  <div>
    <LeadsTable />
  </div>
</template>

<script setup lang="ts">
import LeadsTable from "@/components/leads/leads-table.vue";
</script>
