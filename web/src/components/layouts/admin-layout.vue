<script setup lang="ts">
import AdminSidebar from "./admin-sidebar.vue";
import BreadCrumb from "./bread-crumb.vue";
</script>

<template>
  <div class="flex min-h-screen">
    <admin-sidebar>
      <main class="grid gap-4 p-4">
        <BreadCrumb />
        <router-view />
      </main>
    </admin-sidebar>
  </div>
</template>
