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
  const numberOfPages: number = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? true : false}
          onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {Array(numberOfPages)
        .fill(null)
        .map((_, index) => {
          return (
            <li
              key={index + 1}
              className={cn('page-item', { active: currentPage === index - 1 })}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href="#1"
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </a>
            </li>
          );
        })}

      <li
        className={cn('page-item', { disabled: currentPage === numberOfPages })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === numberOfPages ? true : false}
          onClick={() =>
            currentPage < numberOfPages && onPageChange(currentPage + 1)
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
