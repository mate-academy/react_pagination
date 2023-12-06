import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

export interface Props {
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
  const totalPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, totalPages);

  const handleCurrentPageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevPageClick = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPageClick = () => {
    if (currentPage !== pages.length) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={handlePrevPageClick}
          >
            «
          </a>
        </li>

        {pages.map((page) => (
          <li
            key={page}
            className={cn('page-item', {
              active: page === currentPage,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => handleCurrentPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={cn(
            'page-item',
            {
              disabled: currentPage === pages.length,
            },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages.length}
            onClick={handleNextPageClick}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};

export default Pagination;
