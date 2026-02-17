<script lang="ts" setup generic="T extends object">
import { type Component } from "vue";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import SelectInput from "../common/inputs/select-input.vue";
import type { SortDir } from "@/services/types/common.type";

export type Header<T> = {
  sortKey?: keyof T;
  title: string;
  render: (row: T) => any;
}[];

interface TableProps<T> {
  header: Header<T>;
  tableData: T[];
  tableKey: keyof T;
  count: number;
  limit: number;
  sortKey: keyof T;
  sortDir: SortDir;
  currentPage: number;
  loading?: boolean;
  search?: string;
  leftComponent?: Component;
  leftComponentProps?: Record<string, any>;
  onSearch?: (value: string) => void;
  onLimitChange?: (limit: number) => void;
  onSort: (key: keyof T, direction: "asc" | "desc") => void;
  onPageChange: (page: number) => void;
}

const limitOptions = [
  { label: "5", value: "5" },
  { label: "10", value: "10" },
  { label: "15", value: "15" },
  { label: "20", value: "20" },
];

const props = defineProps<TableProps<T>>();
const emit = defineEmits<{
  (e: "update:search", value: string): void;
  (e: "update:limit", limit: number): void;
}>();

const totalPages = () => Math.ceil(props.count / +props.limit);

function handleSort(value: keyof T) {
  let dir: SortDir = "asc";
  if (props.sortKey === value) {
    dir = props.sortDir === "asc" ? "desc" : "asc";
  }
  props?.onSort(value, dir);
}

function handleSearch(e: InputEvent) {
  const { value } = e.target as HTMLInputElement;
  emit("update:search", value);
  props.onSearch?.(value);
}

function handleLimitChange(value: string) {
  emit("update:limit", +value);
  props.onLimitChange?.(+value);
}

function goToPage(page: number) {
  if (page < 1 || page > totalPages()) return;
  props.onPageChange(page);
}
</script>

<template>
  <div class="w-full flex flex-col gap-4 overflow-auto">
    <div class="flex justify-between">
      <Input :model-value="props.search" placeholder="Search..." class="w-1/5" @input="handleSearch($event)" />

      <div>
        <component :is="leftComponent" v-if="leftComponent" v-bind="leftComponentProps" />
      </div>
    </div>

    <Table class="border-t">
      <TableHeader>
        <TableRow>
          <TableHead
            v-for="column in props.header"
            :key="column.title"
            class="cursor-pointer select-none"
            @click="column?.sortKey && handleSort(column.sortKey)"
          >
            {{ column.title }}
            <span v-if="column.sortKey && props.sortKey === column.sortKey" class="ml-1 text-xs text-secondary">
              {{ sortDir === "asc" ? "↑" : "↓" }}
            </span>
            <span v-if="column.sortKey && props.sortKey !== column.sortKey" class="ml-1 text-gray-400 text-xs"> ↑↓ </span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow v-for="row in props.tableData" :key="row[props.tableKey] as unknown as PropertyKey" class="hover:bg-muted/50">
          <TableCell v-for="column in props.header" :key="column.title">
            <component :is="column.render(row)" />
          </TableCell>
        </TableRow>

        <TableRow v-if="!props.tableData.length && !props.loading">
          <TableCell :colspan="props.header.length" class="text-center py-6 text-muted-foreground"> No results found. </TableCell>
        </TableRow>

        <TableRow v-if="props.loading" class="min-h-10 w-full flex place-content-center">
          <Spinner />
        </TableRow>
      </TableBody>
    </Table>
    <div class="flex justify-between">
      <div class="w-40 flex items-center gap-2">
        <p class="font-medium">Limit:</p>
        <SelectInput
          :model-value="props.limit.toString()"
          :options="limitOptions"
          placeholder="Limit"
          @update:model-value="handleLimitChange"
        />
      </div>
      <div class="flex items-center gap-2">
        <Button size="sm" :disabled="+props.currentPage === 1" @click="goToPage(+props.currentPage - 1)"> Prev </Button>
        <div class="text-sm text-muted-foreground">{{ props.currentPage }} of {{ totalPages() }}</div>
        <Button size="sm" :disabled="+props.currentPage >= totalPages()" @click="goToPage(+props.currentPage + 1)"> Next </Button>
      </div>
    </div>
  </div>
</template>
