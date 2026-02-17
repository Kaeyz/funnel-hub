<script lang="ts" setup>
import { computed, h, onMounted, ref, watch } from "vue";
import TableFilters, { type FormSectionStatusFilter } from "./table-sections-filters.vue";
import { useApi } from "@/composables/useApi";
import type { SortDir } from "@/services/types/common.type";
import { debounce } from "@/lib/utils";
import AppTable, { type Header } from "../common/app-table.vue";
import TableActions from "./table-sections-actions.vue";
import AppBadge from "../common/app-badge.vue";
import { useRouteQuery } from "@vueuse/router";
import { getFormSections } from "@/services/form-sections";
import type { FormSection, FormSectionStatus } from "@/services/types/form-section.type";
import { formSectionBadgeConfig } from "./form-section-helpers";

const props = defineProps<{
  formId: string;
}>();

const count = ref(0);
const page = useRouteQuery("page", "1", { transform: Number });
const limit = useRouteQuery("limit", "10", { transform: Number });
const search = useRouteQuery<string>("search");
const status = useRouteQuery<FormSectionStatusFilter>("status", "all");
const sortKey = useRouteQuery<keyof FormSection>("sortKey", "key");
const sortDir = useRouteQuery<SortDir>("sortDir", "asc");

const { loading, execute, data } = useApi({ fn: getFormSections });

watch(data, (newData) => {
  if (newData) {
    limit.value = newData.limit ?? limit.value;
    page.value = newData?.page ?? page.value;
    count.value = newData?.count ?? count.value;
  }
});

const formsSections = computed(() => data.value?.data ?? []);

const fetchFormSections = debounce(() => {
  execute({
    formId: props.formId,
    limit: +limit.value,
    page: +page.value,
    search: search.value,
    sortDir: sortDir?.value,
    sortKey: sortKey.value,
    status: status.value === "all" ? undefined : status.value,
  });
}, 500);

const header: Header<FormSection> = [
  { title: "Name", sortKey: "name", render: (row) => h("p", {}, String(row.name)) },
  { title: "Key", sortKey: "key", render: (row) => h("p", {}, String(row.key)) },
  { title: "Order", sortKey: "order", render: (row) => h("p", {}, row.order) },
  { title: "Status", render: (row) => h(AppBadge, { config: formSectionBadgeConfig, status: row.status }) },
  { title: "Actions", render: (row) => h(TableActions, { rowData: row, refreshTable: fetchFormSections, formId: props.formId }) },
];

const handlePageChange = (newPage: number) => {
  page.value = newPage;
  fetchFormSections();
};

const handleSearch = (value: string) => {
  search.value = value;
  fetchFormSections();
};

const handleLimitChange = (value: number) => {
  limit.value = value;
  fetchFormSections();
};

const handleSort = (key: keyof FormSection, dir: SortDir) => {
  sortKey.value = key;
  sortDir.value = dir;
  fetchFormSections();
};

const handleStatusChange = (v: FormSectionStatus) => {
  status.value = v;
  fetchFormSections();
};

onMounted(() => fetchFormSections());
</script>

<template>
  <div class="p-4">
    <AppTable
      v-model:search="search"
      :header="header"
      :table-key="'_id'"
      :table-data="formsSections"
      :current-page="page"
      :count="count"
      :limit="limit"
      :sort-key="sortKey"
      :sort-dir="sortDir"
      :loading="loading"
      :left-component="TableFilters"
      :left-component-props="{ refreshForms: fetchFormSections, handleStatusChange, status, formId }"
      :on-search="handleSearch"
      :on-sort="handleSort"
      :on-page-change="handlePageChange"
      :on-limit-change="handleLimitChange"
    />
  </div>
</template>
