import React from 'react';

interface Props {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageClick = (page: number) => {
    if (page !== currentPage && page <= totalPages) {
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

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <li
        key={i}
        className={`page-item ${i === currentPage ? 'active' : ''}`}
        onClick={() => {
          handlePageClick(i);
        }}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${i}`}
          onClick={event => event.preventDefault()}
        >
          {i}
        </a>
      </li>,
    );
  }

  return (
    <ul className="pagination">
      <li className={`page-item  ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={event => {
            event.preventDefault();
            handlePrevClick();
          }}
        >
          «
        </a>
      </li>

      {pages}

      <li
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages ? 'true' : 'false'}
          onClick={event => {
            event.preventDefault();
            handleNextClick();
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
