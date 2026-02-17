<script setup lang="ts">
import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";
</script>

<template>
  <div>
    <router-view />
    <Toaster position="bottom-right" rich-colors />
  </div>
</template>
