import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(total / perPage);
  const nextPageDisabled = currentPage === 1;
  const prevPageDisabled = currentPage === totalPages;

  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i);
  }

  const onNextPageClick = () => {
    if (currentPage !== totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevPageClick = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: nextPageDisabled })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={nextPageDisabled}
          onClick={onPrevPageClick}
        >
          «
        </a>

      </li>
      {pageNumbers.map((number) => (
        <li
          key={number}
          className={cn('page-item', { active: currentPage === number })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${number}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: prevPageDisabled })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={prevPageDisabled}
          onClick={onNextPageClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
