<script setup lang="ts">
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { routes } from "@/router/routes";
import type { Lead } from "@/services/types/lead.type";

const props = defineProps<{
  rowData: Lead;
}>();

const router = useRouter();

const goToSections = () => {
  router.push(routes.adminLead(props.rowData._id));
};
</script>

<template>
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="h-8 w-8 p-0">
          <EllipsisVertical class="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem @click="goToSections">View </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
