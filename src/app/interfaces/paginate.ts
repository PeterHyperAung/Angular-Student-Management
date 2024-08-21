export interface IPaginateInfo<T> {
  pageIndex: number;
  pageSize: number;
  sortField: string;
  sortOrder: 'ascend' | 'descend' | null;
  queryCriteria: T;
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

export const getInitialPaginateInfo = <T>(
  queryCriteria: T
): IPaginateInfo<T> => {
  return {
    pageIndex: 1,
    pageSize: 10,
    sortField: 'id',
    sortOrder: 'ascend',
    queryCriteria,
  };
};
