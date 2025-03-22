import React from 'react';
import './Pagination.scss';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
  onPerPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={i === currentPage ? 'active' : ''}
          data-cy="page"
        >
          <a
            data-cy="pageLink"
            href={`#${i}`}
            onClick={e => {
              e.preventDefault();
              handlePageChange(i);
            }}
          >
            {i}
          </a>
        </li>,
      );
    }

    return pages;
  };

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, total);

  return (
    <div className="pagination">
      <div data-cy="info">
        Page {currentPage} (items {startItem} - {endItem} of {total})
      </div>

      <ul className="pagination__list">
        <li className={currentPage === 1 ? 'disabled' : ''} data-cy="prev">
          <a
            data-cy="prevLink"
            href="#prev"
            onClick={e => {
              e.preventDefault();
              if (currentPage > 1) {
                handlePageChange(currentPage - 1);
              }
            }}
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>

        {renderPageNumbers()}

        <li
          className={currentPage === totalPages ? 'disabled' : ''}
          data-cy="next"
        >
          <a
            data-cy="nextLink"
            href="#next"
            onClick={e => {
              e.preventDefault();
              if (currentPage < totalPages) {
                handlePageChange(currentPage + 1);
              }
            }}
            aria-disabled={currentPage === totalPages}
          >
            »
          </a>
        </li>
      </ul>

      <select
        data-cy="perPageSelector"
        value={perPage}
        onChange={e => {
          const newPerPage = Number(e.target.value);

          onPerPageChange(newPerPage);
        }}
      >
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  );
};
