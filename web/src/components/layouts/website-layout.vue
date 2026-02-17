<script setup lang="ts">
import WebSidebar from "./website-sidebar.vue";
</script>

<template>
  <div class="flex min-h-screen border-2">
    <WebSidebar>
      <main class="grid gap-4 p-4">
        <router-view />
      </main>
    </WebSidebar>
  </div>
</template>
