<script lang="ts" setup>
import { h, ref } from "vue";
import AppTable, { type Header } from "./app-table.vue";
import Button from "../ui/button/Button.vue";

type TableData = {
  id: string;
  name: string;
  type: string;
  status: string;
  limit: number;
  reviewer: string;
};

const header: Header<Partial<TableData>> = {
  //id: { label: "", render: () => null },
  name: { label: "", render: (row) => h(Button, {}, () => row.name) },
  status: { label: "", render: (row) => h("p", {}, () => row.limit) },
  /* status: { label: "Status", render: (row) => row.status },
  limit: { label: "Limit", render: (row) => row.limit },
  reviewer: { label: "Reviewer", render: (row) => row.reviewer }, */
};
// 3️⃣ Table data
const tableData = ref([
  { id: "1", name: "Document A", type: "Section", status: "Done", limit: 10, reviewer: "Eddie Lake" },
  { id: "2", name: "Document B", type: "Section", status: "Pending", limit: 5, reviewer: "Assign reviewer" },
  { id: "3", name: "Document C", type: "Section", status: "Done", limit: 8, reviewer: "Jamik Tashpulatov" },
]);

// 4️⃣ Pagination state
const currentPage = ref(0);
const totalNumberOfPages = 3;
const limit = 10;

// 5️⃣ Event handlers
function handlePageChange(page: number) {
  console.log("Page changed:", page);
  currentPage.value = page;
}

function handleSearch(value: string) {
  console.log("Search:", value);
}

function handleFilter(key: string, direction: "asc" | "desc") {
  console.log("Sort/filter:", key, direction);
}
</script>

<template>
  <div class="p-4">
    <AppTable
      :header="header"
      :table-data="tableData"
      :current-page="currentPage"
      :total-number-of-pages="totalNumberOfPages"
      :limit="limit"
      :loading="true"
      @page-change="handlePageChange"
      @search="handleSearch"
      @filter="handleFilter"
    />
  </div>
</template>
