import React from 'react';
import cn from 'classnames';


interface Props {
  total: number;
  currentPage: number;
  perPage: number;
  onPageChange: (newPage: number, newPerPage: number) => void;
}

export const Pagination: React.FC<Props> = ({ total, currentPage, perPage, onPageChange }) => {
  return (
    <ul className="pagination">
        <li className={cn('page-item', {'disabled': currentPage === 1})}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => currentPage > 1 && onPageChange( currentPage - 1, perPage)}
          >
            «
          </a>
        </li>
        {Array.from({ length: total }).map((_, index) => (
        <li key={index + 1} className={cn('page-item', {active: currentPage === index + 1})}>
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${index + 1}`}
            onClick={() => onPageChange(index + 1, perPage)}
          >
            {index + 1}
          </a>
        </li>))}
        <li className={cn('page-item', {disabled: currentPage === total})}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === total}
            onClick={() => currentPage < total && onPageChange(currentPage + 1, perPage)}
          >
            »
          </a>
        </li>
      </ul>
  );
};
