import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const paginationRange = Math.ceil(total / perPage);
  const pages = getNumbers(1, paginationRange);

  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === paginationRange;

  const onNext = () => {
    if (currentPage < paginationRange) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: prevDisabled })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={prevDisabled}
            onClick={onPrevious}
          >
            «
          </a>
        </li>

        {pages.map((page) => (
          <li
            className={cn('page-item', { active: page === currentPage })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => {
                if (page !== currentPage) {
                  onPageChange(page);
                }
              }}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item', {
            disabled: nextDisabled,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={nextDisabled}
            onClick={onNext}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
