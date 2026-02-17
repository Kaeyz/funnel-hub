<script lang="ts" setup>
import { computed, h, onMounted, ref, watch } from "vue";
import { useApi } from "@/composables/useApi";
import type { Lead } from "@/services/types/lead.type";
import type { SortDir } from "@/services/types/common.type";
import { debounce, formatDate } from "@/lib/utils";
import AppTable, { type Header } from "../common/app-table.vue";
import TableActions from "./table-actions.vue";
import { useRouteQuery } from "@vueuse/router";
import { getLeads } from "@/services/leads";

const count = ref(0);
const page = useRouteQuery("page", "1", { transform: Number });
const limit = useRouteQuery("limit", "10", { transform: Number });
const search = useRouteQuery<string>("search");
const sortKey = useRouteQuery<keyof Lead>("sortKey", "userName");
const sortDir = useRouteQuery<SortDir>("sortDir", "asc");

const { loading, execute, data } = useApi({ fn: getLeads });

watch(data, (newData) => {
  if (newData) {
    limit.value = newData.limit ?? limit.value;
    page.value = newData?.page ?? page.value;
    count.value = newData?.count ?? count.value;
  }
});

const leads = computed(() => data.value?.data ?? []);

const fetchForms = debounce(() => {
  execute({
    limit: +limit.value,
    page: +page.value,
    search: search.value,
    sortDir: sortDir?.value,
    sortKey: sortKey.value,
  });
}, 500);

const header: Header<Lead> = [
  { title: "UserName", sortKey: "userName", render: (row) => h("p", {}, String(row.userName)) },
  { title: "Date", render: (row) => h("p", {}, formatDate(row.createdAt)) },
  { title: "Actions", render: (row) => h(TableActions, { rowData: row }) },
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

const handleSort = (key: keyof Lead, dir: SortDir) => {
  sortKey.value = key;
  sortDir.value = dir;
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
      :table-data="leads"
      :current-page="page"
      :count="count"
      :limit="limit"
      :sort-key="sortKey"
      :sort-dir="sortDir"
      :loading="loading"
      :on-search="handleSearch"
      :on-sort="handleSort"
      :on-page-change="handlePageChange"
      :on-limit-change="handleLimitChange"
    />
  </div>
</template>
