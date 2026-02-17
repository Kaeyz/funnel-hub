<script setup lang="ts">
defineProps<{
  homePath: string;
}>();
</script>

<template>
  <a class="flex items-center gap-2 mb-2 cursor-pointer" :href="homePath">
    <div class="aspect-square size-8 rounded-lg text-sidebar-primary-foreground border-2">
      <img src="@/assets/logo-icon.png" alt="Funnel Hub" class="aspect-square" />
    </div>
    <div>
      <img src="@/assets/logo.png" alt="Funnel Hub" class="w-30" />
    </div>
  </a>
</template>
