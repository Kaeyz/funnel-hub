<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const route = useRoute();

const formatSegment = (segment: string) => {
  if (/^\d+$/.test(segment)) return `#${segment}`;

  return segment
    .replace(/-/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

const breadcrumbs = computed(() => {
  const segments = route.path.split("/").filter(Boolean);

  const adminIndex = segments.indexOf("admin");
  if (adminIndex === -1) return [];

  const relevantSegments = segments.slice(adminIndex + 1);

  return relevantSegments.map((segment, index) => {
    const path = "/" + segments.slice(0, adminIndex + 1 + index + 1).join("/");
    const label = formatSegment(segment);
    return { label, path };
  });
});
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <!-- Always show Home first -->
      <BreadcrumbItem>
        <BreadcrumbLink as-child>
          <a href="/">Home</a>
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbSeparator v-if="breadcrumbs.length" />

      <!-- Render dynamic segments after /admin -->
      <template v-for="(item, index) in breadcrumbs" :key="item.path">
        <BreadcrumbItem>
          <BreadcrumbLink v-if="index < breadcrumbs.length - 1" as-child>
            <a :href="item.path">{{ item.label }}</a>
          </BreadcrumbLink>
          <BreadcrumbPage v-else>
            {{ item.label }}
          </BreadcrumbPage>
        </BreadcrumbItem>

        <BreadcrumbSeparator v-if="index < breadcrumbs.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
