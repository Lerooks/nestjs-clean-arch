export interface PaginationProps<T> {
  page: number;
  total: number;
  items: T[];
}
