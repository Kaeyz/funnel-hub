<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Forms</h1>
    <p>View and Manage all Forms</p>
  </div>
  <div>
    <FormsTable />
  </div>
</template>

<script setup lang="ts">
import FormsTable from "@/components/forms/forms-table.vue";
</script>
