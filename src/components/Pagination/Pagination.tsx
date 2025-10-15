import cn from 'classnames';
import React from 'react';
import { PaginationItem } from '../PaginationItem';

type Props = {
  total: number;
  itemsPerPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  itemsPerPage,
  currentPage = 1,
  onPageChange,
}) => {
  const FIRST_PAGE = 1;
  const MIN_PAGE_COUNT = 1;

  const pageCount = Math.max(MIN_PAGE_COUNT, Math.ceil(total / itemsPerPage));
  const canNext = currentPage < pageCount;
  const canPrev = currentPage > FIRST_PAGE;
  const pages = Array.from(
    { length: pageCount },
    (_, index) => index + FIRST_PAGE,
  );

  const handleSelectPage = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= pageCount) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: !canPrev })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={!canPrev}
          onClick={() => {
            handleSelectPage(currentPage - 1);
          }}
        >
          «
        </a>
      </li>
      {pages.map(page => {
        const isCurrent = page === currentPage;

        return (
          <PaginationItem
            key={page}
            pageNum={page}
            isCurrent={isCurrent}
            onPageChange={handleSelectPage}
          />
        );
      })}
      <li className={cn('page-item', { disabled: !canNext })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={!canNext}
          onClick={() => {
            handleSelectPage(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
