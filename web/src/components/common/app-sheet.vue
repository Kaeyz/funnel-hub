<script setup lang="ts">
import { Sheet, SheetContent, SheetHeader, SheetDescription, SheetTitle } from "@/components/ui/sheet";

const props = defineProps<{
  open: boolean;
  toggleDrawer: () => void;
  title: string;
  description: string;
}>();
</script>

<template>
  <Sheet :open="props.open" @update:open="toggleDrawer">
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle v-if="props.title" class="font-bold text-xl">{{ props.title }}</SheetTitle>
        <SheetDescription v-if="props.description"> {{ props.description }} </SheetDescription>
      </SheetHeader>
      <div class="grid px-4">
        <slot />
      </div>
    </SheetContent>
  </Sheet>
</template>
