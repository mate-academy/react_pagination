import React from 'react';
import { getNumbers } from '../../utils';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange
}) => {
  const amountOfPages: number = Math.ceil(total / perPage);
  const listOfPages: number[] = getNumbers(1, amountOfPages);

  return (
    <ul className="pagination">
      <li
        className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={
          currentPage > 1
            ? () => onPageChange(currentPage - 1)
            : undefined
        }
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
        >
          «
        </a>
      </li>
      {listOfPages.map((item) => {
        return (
          <li
            className={`page-item ${currentPage === item ? 'active' : ''}`}
            onClick={() => onPageChange(item)}
            key={item}
          >
            <a data-cy="pageLink" className="page-link" href={`#${item}`}>
              {item}
            </a>
          </li>
        );
      })}
      <li
        className={`page-item ${currentPage === amountOfPages ? 'disabled' : ''}`}
        onClick={
          () => currentPage < amountOfPages && onPageChange(currentPage + 1)
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === amountOfPages ? 'true' : 'false'}
        >
          »
        </a>
      </li>
    </ul>
  );
};
