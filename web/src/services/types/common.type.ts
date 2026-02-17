export type Paginated<T> = {
  data: T[];
  limit: number;
  count: number;
  page: number;
};

export type SortDir = "asc" | "desc";
