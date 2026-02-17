<script setup lang="ts">
import { computed } from "vue";
import { Badge } from "@/components/ui/badge";

type ConfigOptions = {
  label?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  class?: string;
  icon?: any;
};

export type AppBadgeConfig<T extends string> = Record<T, ConfigOptions>;

const props = defineProps<{
  status: string;
  config: AppBadgeConfig<string>;
}>();

const config = computed<ConfigOptions>(() => {
  return (
    props.config[props.status] ?? {
      label: props.status,
      variant: "secondary",
    }
  );
});
</script>

<template>
  <Badge :variant="config.variant" :class="config.class">
    <component :is="config.icon" v-if="config.icon" class="mr-1 h-4 w-4" />
    {{ config.label ?? props.status }}
  </Badge>
</template>
