<script lang="ts" setup>
import { computed, h, onMounted, ref, watch } from "vue";
import TableFilters, { type FormStatusFilter } from "./table-filters.vue";
import { getForms } from "@/services/forms";
import { useApi } from "@/composables/useApi";
import type { Form, FormStatus } from "@/services/types/form.type";
import type { SortDir } from "@/services/types/common.type";
import { debounce, formatDate } from "@/lib/utils";
import AppTable, { type Header } from "../common/app-table.vue";
import TableActions from "./table-actions.vue";
import AppBadge from "../common/app-badge.vue";
import { formBadgeConfig } from "./form-helpers";
import { useRouteQuery } from "@vueuse/router";

const count = ref(0);
const page = useRouteQuery("page", "1", { transform: Number });
const limit = useRouteQuery("limit", "10", { transform: Number });
const search = useRouteQuery<string>("search");
const status = useRouteQuery<FormStatusFilter>("status", "all");
const sortKey = useRouteQuery<keyof Form>("sortKey", "key");
const sortDir = useRouteQuery<SortDir>("sortDir", "asc");

const { loading, execute, data } = useApi({ fn: getForms });

watch(data, (newData) => {
  if (newData) {
    limit.value = newData.limit ?? limit.value;
    page.value = newData?.page ?? page.value;
    count.value = newData?.count ?? count.value;
  }
});

const forms = computed(() => data.value?.data ?? []);

const fetchForms = debounce(() => {
  execute({
    limit: +limit.value,
    page: +page.value,
    search: search.value,
    sortDir: sortDir?.value,
    sortKey: sortKey.value,
    status: status.value === "all" ? undefined : status.value,
  });
}, 500);

const header: Header<Form> = [
  { title: "Name", sortKey: "name", render: (row) => h("p", {}, String(row.name)) },
  { title: "Key", sortKey: "key", render: (row) => h("p", {}, String(row.key)) },
  { title: "Status", render: (row) => h(AppBadge, { config: formBadgeConfig, status: row.status }) },
  { title: "Last Update", render: (row) => h("p", {}, formatDate(row.updatedAt)) },
  { title: "Actions", render: (row) => h(TableActions, { rowData: row, refreshForms: fetchForms }) },
];

const handlePageChange = (newPage: number) => {
  page.value = newPage;
  fetchForms();
};

const handleSearch = (value: string) => {
  search.value = value;
  fetchForms();
};

const handleLimitChange = (value: number) => {
  limit.value = value;
  fetchForms();
};

const handleSort = (key: keyof Form, dir: SortDir) => {
  sortKey.value = key;
  sortDir.value = dir;
  fetchForms();
};

const handleStatusChange = (v: FormStatus) => {
  status.value = v;
  fetchForms();
};

onMounted(() => fetchForms());
</script>

<template>
  <div class="p-4">
    <AppTable
      v-model:search="search"
      :header="header"
      :table-key="'_id'"
      :table-data="forms"
      :current-page="page"
      :count="count"
      :limit="limit"
      :sort-key="sortKey"
      :sort-dir="sortDir"
      :loading="loading"
      :left-component="TableFilters"
      :left-component-props="{ refreshForms: fetchForms, handleStatusChange, status }"
      :on-search="handleSearch"
      :on-sort="handleSort"
      :on-page-change="handlePageChange"
      :on-limit-change="handleLimitChange"
    />
  </div>
</template>
