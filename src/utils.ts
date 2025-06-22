import { useSearchParams } from 'react-router-dom';
import { PerPage, perPageOptions } from './types/PerPage';
import { useEffect, useState } from 'react';

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getPageItems(
  itemsList: string[],
  { perPage, pageNumber }: { perPage: number; pageNumber: number },
): string[] {
  const maxPages = Math.ceil(itemsList.length / perPage);
  const firstElementId = (pageNumber - 1) * perPage;
  const lastElementId =
    pageNumber < maxPages ? firstElementId + perPage : itemsList.length;

  return [...itemsList].slice(firstElementId, lastElementId);
}

export const usePaginationParams = (itemsCount: number) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const perPageParamRaw = parseInt(searchParams.get('perPage') || '5', 10);
  const pageNumberParamRaw = parseInt(searchParams.get('page') || '1', 10);

  const perPageParam = perPageOptions.includes(perPageParamRaw as PerPage)
    ? (perPageParamRaw as PerPage)
    : 5;
  const [maxPagesCount, setMaxPagesCount] = useState<number>(
    Math.ceil(itemsCount / perPageParam),
  );
  const pageNumberParam = Math.max(
    1,
    Math.min(pageNumberParamRaw, maxPagesCount),
  );

  const [perPage, setPerPage] = useState<PerPage>(perPageParam);
  const [pageNumber, setPageNumber] = useState<number>(pageNumberParam);

  useEffect(() => {
    setSearchParams({ perPage: String(perPage), page: String(pageNumber) });
  }, [pageNumber, perPage, setSearchParams]);

  useEffect(() => {
    setMaxPagesCount(Math.ceil(itemsCount / perPage));
  }, [perPage, itemsCount]);

  return {
    perPage,
    pageNumber,
    maxPagesCount,
    setPerPage,
    setPageNumber,
    setMaxPagesCount,
  };
};
