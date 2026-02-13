<script setup lang="ts">
import AppSidebar from "./app-sidebar.vue";
</script>

<template>
  <div class="flex min-h-screen">
    <app-sidebar>
      <main class="flex-1 p-4">
        <router-view />
      </main>
    </app-sidebar>
  </div>
</template>
