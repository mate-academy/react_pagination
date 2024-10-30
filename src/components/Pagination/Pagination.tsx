import React from 'react';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  onPerPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => handlePageClick(currentPage - 1)}
          >
            «
          </a>
        </li>
        {[...Array(totalPages)].map((_, index) => (
          <li
            key={index}
            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${index + 1}`}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? 'disabled' : ''
          }`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages}
            onClick={() => handlePageClick(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>

      <select
        data-cy="perPageSelector"
        value={perPage}
        onChange={e => onPerPageChange(Number(e.target.value))}
        className="form-control"
      >
        {[3, 5, 10, 20].map(size => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};
