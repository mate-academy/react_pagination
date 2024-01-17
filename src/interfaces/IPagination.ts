import React from 'react';

export interface IPagination {
  total: number;
  perPage: number;
  currentPage: number;
  onChangePage: React.Dispatch<React.SetStateAction<number>>
}
