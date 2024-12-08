import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = props => {
  const { total, perPage, currentPage, onPageChange } = props;

  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (item, i) => i + 1);

  const nextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage - 1 === 0 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={prevPage}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={uuidv4()}
          className={cn('page-item', {
            active: page === currentPage,
          })}
        >
          <a
            data-cy={`pageLink`}
            className="page-link"
            href="#page"
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: currentPage === totalPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
