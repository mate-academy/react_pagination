import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface PaginationProps {
  arrItems: string[];
  total: number;
  perPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  arrItems,
  total,
  perPage,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  const totalPages = getNumbers(1, Math.ceil(total / perPage)).length;

  const moveLeft = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
  };

  const moveRight = () => {
    setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage);
  };

  return (
    <div>
      <ul className="pagination">
        <li
          className={cn('page-item', { disabled: currentPage === 1 })}
          onClick={moveLeft}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>
        {pageNumbers.map(num => (
          <li
            key={num}
            className={cn('page-item', {
              active: currentPage === num,
            })}
            onClick={() => setCurrentPage(num)}
          >
            <a data-cy="pageLink" className="page-link" href={`#${num}`}>
              {num}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item', {
            disabled: currentPage === totalPages,
          })}
          onClick={moveRight}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {arrItems.map((item, index) => (
          <li key={index} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
