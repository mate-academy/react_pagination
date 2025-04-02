import React from 'react';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  items: string[];
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  items,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pageNumbers = getNumbers(1, totalPages);

  const handlePrevClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick =
    (page: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      if (page !== currentPage) {
        onPageChange(page);
      }
    };

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages || totalPages === 0;

  return (
    <>
      {totalPages > 0 && (
        <ul className="pagination">
          <li className={`page-item ${isPrevDisabled ? 'disabled' : ''}`}>
            <a
              data-cy="prevLink"
              className="page-link"
              href="#prev"
              aria-disabled={isPrevDisabled}
              onClick={handlePrevClick}
            >
              «
            </a>
          </li>

          {pageNumbers.map(page => (
            <li
              key={page}
              className={`page-item ${page === currentPage ? 'active' : ''}`}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={handlePageClick(page)}
              >
                {page}
              </a>
            </li>
          ))}

          <li className={`page-item ${isNextDisabled ? 'disabled' : ''}`}>
            <a
              data-cy="nextLink"
              className="page-link"
              href="#next"
              aria-disabled={isNextDisabled}
              onClick={handleNextClick}
            >
              »
            </a>
          </li>
        </ul>
      )}

      <ul>
        {items.length > 0 ? (
          items.map(item => (
            <li data-cy="item" key={item}>
              {item}
            </li>
          ))
        ) : (
          <li>No item to display for this page.</li>
        )}
      </ul>
    </>
  );
};
