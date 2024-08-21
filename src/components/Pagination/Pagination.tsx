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
  const pageNumbers = getNumbers(1, Math.ceil(total / perPage));

  const moveLeft = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
  };

  const moveRight = () => {
    setCurrentPage(
      currentPage < pageNumbers.length ? currentPage + 1 : currentPage,
    );
  };

  return (
    <div>
      <ul className="pagination">
        <li
          className={cn('page-item', { disabled: currentPage === 1 })}
          onClick={event => {
            event.preventDefault();
            moveLeft();
          }}
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
            onClick={event => {
              event.preventDefault();
              setCurrentPage(num);
            }}
          >
            <a data-cy="pageLink" className="page-link" href={`#${num}`}>
              {num}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item', {
            disabled: currentPage === pageNumbers.length,
          })}
          onClick={event => {
            event.preventDefault();
            moveRight();
          }}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pageNumbers.length}
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
