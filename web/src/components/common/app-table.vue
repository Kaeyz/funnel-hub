<script lang="ts" setup generic="T extends { id: string }">
import { ref } from "vue";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type Header<T> = Record<
  string,
  {
    label: string;
    render: (row: T) => any;
  }
>;

export interface TableProps<T> {
  header: Header<T>;
  tableData: T[];
  totalNumberOfPages: number;
  limit: number;
  currentPage: number;
  loading?: boolean;
  onPageChange: (page: number) => void;
  onSearch?: (value: string) => void;
  onFilter?: (key: keyof T, direction: "asc" | "desc") => void;
}

const props = defineProps<TableProps<T>>();

const searchTerm = ref("");
const sortKey = ref<keyof T | "">("");
const sortDirection = ref<"asc" | "desc">("asc");

function handleSort(key: keyof T) {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortDirection.value = "asc";
  }

  props.onFilter?.(key, sortDirection.value);
}

function handleSearch() {
  props.onSearch?.(searchTerm.value);
}

function goToPage(page: number) {
  if (page < 0 || page >= props.totalNumberOfPages) return;
  props.onPageChange(page);
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between items-center gap-2">
      <Input v-model="searchTerm" placeholder="Search..." class="w-1/3" @input="handleSearch" />
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            v-for="(column, key) in props.header"
            :key="String(key)"
            class="cursor-pointer select-none"
            @click="handleSort(key as keyof T)"
          >
            {{ column.label }}
            <span v-if="sortKey === key" class="ml-1">
              {{ sortDirection === "asc" ? "↑" : "↓" }}
            </span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow v-for="row in props.tableData" :key="row.id" class="hover:bg-muted/50">
          <TableCell v-for="(column, key) in props.header" :key="String(key)">
            <component :is="column.render(row)" />
          </TableCell>
        </TableRow>

        <TableRow v-if="!props.tableData.length">
          <TableCell :colspan="Object.keys(props.header).length + 1" class="text-center py-6 text-muted-foreground">
            No results found.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <div class="flex justify-end items-center gap-2">
      <Button size="sm" :disabled="props.currentPage === 0" @click="goToPage(props.currentPage - 1)">Prev</Button>
      <div class="text-sm text-muted-foreground">{{ props.currentPage + 1 }} of {{ props.totalNumberOfPages }}</div>
      <Button size="sm" :disabled="props.currentPage >= props.totalNumberOfPages - 1" @click="goToPage(props.currentPage + 1)">
        Next
      </Button>
    </div>
  </div>
</template>
