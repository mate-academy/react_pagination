import cn from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<Props> = ({
  total, perPage, currentPage, onPageChange,
}) => {
  const totalPages: number = Math.ceil(total / perPage);
  const pages: number[] = getNumbers(1, totalPages);
  const items = getNumbers(1, total)
    .map(n => `Item ${n}`);
  const currentPageItems = items.slice(
    (currentPage - 1) * perPage, currentPage * perPage,
  );

  const handlePageChanging = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={cn(
          'page-item',
          { disabled: currentPage === 1 },
        )}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            onClick={handlePrevClick}
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>
        {pages.map((page) => (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => handlePageChanging(page)}
              type="button"
            >
              {page}
            </a>
          </li>
        ))}
        <li className={cn(
          'page-item',
          { disabled: currentPage === totalPages },
        )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            onClick={handleNextClick}
            aria-disabled={currentPage === totalPages}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {currentPageItems.map((item) => (
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </>
  );
};
