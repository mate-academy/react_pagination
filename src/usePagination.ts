import { useMemo } from 'react';

const range = (start: number, end: number) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

export const DOTS = 8230;

type Params = {
  total: number;
  perPage: number;
  page: number;
  siblingCount: number;
};

type Func = (obj: Params) => number[];

export const usePagination: Func = ({
  total,
  perPage,
  page,
  siblingCount,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(total / perPage);
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, totalPageCount);
    const limitDots = 2;

    const shouldShowLeftDots = leftSiblingIndex > limitDots;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - limitDots;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;
    const countElemBeforeSibl = 3;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = countElemBeforeSibl + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = countElemBeforeSibl + 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );

      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return [];
  }, [total, perPage, page, siblingCount]);

  return paginationRange;
};
