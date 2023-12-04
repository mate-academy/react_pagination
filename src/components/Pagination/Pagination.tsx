import cn from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (num: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const maxPage = Math.ceil(total / perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === maxPage;

  const pageToRender = getNumbers(1, maxPage);

  const handlePageChange = (page: number) => {
    if (page === currentPage || page > maxPage || page < 1) {
      return;
    }

    onPageChange(page);
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: isFirstPage,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {pageToRender.map((num) => (
        <li
          className={cn('page-item', {
            active: currentPage === num,
          })}
          key={num}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${num}`}
            onClick={() => handlePageChange(num)}
          >
            {num}
          </a>
        </li>
      ))}

      <li className={cn('page-item', {
        disabled: isLastPage,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
