export interface IPaginateInfo {
  pageIndex: number;
  pageSize: number;
  sortField: string;
  sortOrder: 'asc' | 'desc' | null;
  searchValues: {
    key: string;
    value: string;
  }[];
}

export interface IPaginateResponse<T> {
  content: T[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export const initialPaginateInfo: IPaginateInfo = {
  pageIndex: 1,
  pageSize: 10,
  sortField: 'id',
  sortOrder: 'asc',
  searchValues: [
    { key: 'name', value: '' },
    { key: 'principal', value: '' },
  ],
};
