// For API returning pages response
export interface IPageable<T> {
  content: T;
  pageable: any;
  sort: any;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  empty: boolean;
  first: boolean;
}
