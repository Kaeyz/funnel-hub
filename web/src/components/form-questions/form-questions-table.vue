<script lang="ts" setup>
import { computed, h, onMounted, ref, watch } from "vue";
import TableFilters from "./table-questions-filters.vue";
import { useApi } from "@/composables/useApi";
import type { Question, QuestionStatus } from "@/services/types/question.type";
import type { SortDir } from "@/services/types/common.type";
import { debounce } from "@/lib/utils";
import AppTable, { type Header } from "../common/app-table.vue";
import TableActions from "./table-questions-actions.vue";
import AppBadge from "../common/app-badge.vue";
import { questionBadgeConfig, type QuestionStatusFilter } from "./form-question-helpers";
import { useRouteQuery } from "@vueuse/router";
import { getQuestions } from "@/services/questions";

const props = defineProps<{
  formId: string;
  sectionId: string;
}>();

const count = ref(0);
const page = useRouteQuery("page", "1", { transform: Number });
const limit = useRouteQuery("limit", "10", { transform: Number });
const search = useRouteQuery<string>("search");
const status = useRouteQuery<QuestionStatusFilter>("status", "all");
const sortKey = useRouteQuery<keyof Question>("sortKey", "order");
const sortDir = useRouteQuery<SortDir>("sortDir", "desc");

const { loading, execute, data } = useApi({ fn: getQuestions });

watch(data, (newData) => {
  if (newData) {
    limit.value = newData.limit ?? limit.value;
    page.value = newData?.page ?? page.value;
    count.value = newData?.count ?? count.value;
  }
});

const questions = computed(() => data.value?.data ?? []);

const fetchQuestions = debounce(() => {
  execute({
    formSectionId: props.sectionId,
    limit: +limit.value,
    page: +page.value,
    search: search.value,
    sortDir: sortDir?.value,
    sortKey: sortKey.value,
    status: status.value === "all" ? undefined : status.value,
  });
}, 500);

const header: Header<Question> = [
  { title: "Label", sortKey: "label", render: (row) => h("p", {}, String(row.label)) },
  { title: "Key", sortKey: "key", render: (row) => h("p", {}, String(row.key)) },
  { title: "Order", sortKey: "order", render: (row) => h("p", {}, row.order) },
  { title: "Status", render: (row) => h(AppBadge, { config: questionBadgeConfig, status: row.status }) },
  {
    title: "Actions",
    render: (row) =>
      h(TableActions, { rowData: row, refreshTable: fetchQuestions, formId: props.formId, sectionId: props.sectionId }),
  },
];

const handlePageChange = (newPage: number) => {
  page.value = newPage;
  fetchQuestions();
};

const handleSearch = (value: string) => {
  search.value = value;
  fetchQuestions();
};

const handleLimitChange = (value: number) => {
  limit.value = value;
  fetchQuestions();
};

const handleSort = (key: keyof Question, dir: SortDir) => {
  sortKey.value = key;
  sortDir.value = dir;
  fetchQuestions();
};

const handleStatusChange = (v: QuestionStatus) => {
  status.value = v;
  fetchQuestions();
};

onMounted(() => fetchQuestions());
</script>

<template>
  <div class="p-4">
    <AppTable
      v-model:search="search"
      :header="header"
      :table-key="'_id'"
      :table-data="questions"
      :current-page="page"
      :count="count"
      :limit="limit"
      :sort-key="sortKey"
      :sort-dir="sortDir"
      :loading="loading"
      :left-component="TableFilters"
      :left-component-props="{ refreshForms: fetchQuestions, handleStatusChange, status, formId, sectionId }"
      :on-search="handleSearch"
      :on-sort="handleSort"
      :on-page-change="handlePageChange"
      :on-limit-change="handleLimitChange"
    />
  </div>
</template>
