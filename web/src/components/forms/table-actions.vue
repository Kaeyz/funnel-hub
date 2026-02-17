<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-vue-next";
import EditForm from "./edit-form.vue";
import type { Form } from "@/services/types/form.type";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { routes } from "@/router/routes";
import { useApi } from "@/composables/useApi";
import { updateFormStatus } from "@/services/forms";
import { toast } from "vue-sonner";

const props = defineProps<{
  rowData: Form;
  refreshForms: () => void;
}>();

const router = useRouter();

const editIsOpen = ref(false);
const toggleEdit = () => (editIsOpen.value = !editIsOpen.value);

const { loading, execute } = useApi({
  fn: updateFormStatus,
  onSuccess: (msg) => {
    props.refreshForms();
    toast.success(msg);
  },
  onError: (msg) => {
    toast.error(msg);
  },
});

const goToSections = () => {
  router.push(routes.adminFormSection(props.rowData._id));
};

const canActivate = computed(() => ["draft", "archived"].includes(props.rowData.status));
const canArchive = computed(() => ["draft", "active"].includes(props.rowData.status));

const activate = () => execute(props.rowData._id, "active");
const archive = () => execute(props.rowData._id, "archived");
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
        <DropdownMenuItem @click="goToSections">Sections </DropdownMenuItem>
        <DropdownMenuItem @click="toggleEdit"> Edit </DropdownMenuItem>
        <DropdownMenuItem v-if="canActivate" :disabled="loading" @click="activate"> Activate </DropdownMenuItem>
        <DropdownMenuSeparator v-if="canArchive" />
        <DropdownMenuItem v-if="canArchive" :disabled="loading" class="text-destructive" @click="archive">
          Archive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <EditForm :data="rowData" :open="editIsOpen" :toggle-drawer="toggleEdit" :refresh-forms="refreshForms" />
  </div>
</template>
