export type Sort = "ASC" | "DESC";

export type Timeline = "all" | "incoming" | "past";

export type Pagination = {
  pageNumber?: number;
  pageSize?: number;
  sort?: Sort;
  search?: string;
  timeline?: Timeline;
};

export type List<T> = {
  total: number;
  data: T[];
};

export type ApiList<T> = {
  count: number;
  rows: T[];
};
