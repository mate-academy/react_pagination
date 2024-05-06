import cn from 'classnames';
import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageItems: number[] = [];
  const totalPages = Math.ceil(total / perPage);

  for (let i = 1; i <= totalPages; i++) {
    pageItems.push(i);
  }

  const isFirstPage = currentPage === pageItems[0];
  const isLastPage = currentPage === pageItems[pageItems.length - 1];

  const handlePrevPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', { disabled: isFirstPage })}
        onClick={handlePrevPage}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
        >
          «
        </a>
      </li>
      {pageItems.map(item => (
        <li
          onClick={() => onPageChange(item)}
          className={cn('page-item', { active: currentPage === item })}
          key={item}
        >
          <a data-cy="pageLink" className="page-link" href={'#${item}'}>
            {item}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', { disabled: isLastPage })}
        onClick={handleNextPage}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
