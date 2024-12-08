import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleNavClick = (
    e: React.MouseEvent,
    page: number,
    isDisabled: boolean,
  ) => {
    if (isDisabled) {
      e.preventDefault();

      return;
    }

    onPageChange(page);
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: isFirstPage })}>
        <a
          data-cy="prevLink"
          className={cn('page-link', { active: !isFirstPage })}
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={e => handleNavClick(e, currentPage - 1, isFirstPage)}
        >
          «
        </a>
      </li>

      {pages.map((page: number) => (
        <li
          data-cy="pageLink"
          className={cn('page-item', {
            active: page === currentPage,
          })}
          key={page}
        >
          <a
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: isLastPage })}>
        <a
          data-cy="nextLink"
          className={cn('page-link', { active: !isLastPage })}
          href="#next"
          aria-disabled={isLastPage}
          onClick={e => handleNavClick(e, currentPage + 1, isLastPage)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
