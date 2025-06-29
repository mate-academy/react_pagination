import React from 'react';

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
  const totalPages = Math.ceil(total / perPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <ul className="pagination">
      <li className={`page-item ${isPrevDisabled ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPrevDisabled}
          onClick={e => {
            e.preventDefault();
            if (!isPrevDisabled) {
              handleClick(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pageNumbers.map(num => (
        <li
          key={num}
          className={`page-item ${currentPage === num ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${num}`}
            onClick={(e) => {
              e.preventDefault();
              handleClick(num);
            }}
          >
            {num}
          </a>
        </li>
      ))}

      <li className={`page-item ${isNextDisabled ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isNextDisabled}
          onClick={e => {
            e.preventDefault();
            if (!isNextDisabled) {
              handleClick(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
