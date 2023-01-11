import cn from 'classnames';
import {
  FC, memo, useCallback, useMemo,
} from 'react';

type Props = {
  total: number,
  itemsPerPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: FC<Props> = memo(({
  total,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const pageNums: number[] = [];
  const pagesCounter = useMemo(() => {
    return Math.ceil(total / itemsPerPage);
  }, [total, itemsPerPage]);

  for (let i = 1; i <= pagesCounter; i += 1) {
    pageNums.push(i);
  }

  const handlePageNumClick = useCallback((num: number) => {
    if (num !== currentPage && num > 0 && num <= pageNums.length) {
      onPageChange(num);
    }
  }, [currentPage, pageNums]);

  const isFirstPageActive = useMemo(() => currentPage === 1, [currentPage]);
  const isLastPageActive = useMemo(() => (
    currentPage === pageNums.length
  ), [currentPage]);

  return (
    <ul className="pagination">
      <li className={cn(
        'page-item',
        { disabled: isFirstPageActive },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPageActive}
          onClick={() => handlePageNumClick(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pageNums.map(num => (
        <li
          key={num}
          className={cn(
            'page-item',
            { active: num === currentPage },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${num}`}
            onClick={() => handlePageNumClick(num)}
          >
            {num}
          </a>
        </li>
      ))}
      <li className={cn(
        'page-item',
        { disabled: isLastPageActive },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPageActive}
          onClick={() => handlePageNumClick(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
});
