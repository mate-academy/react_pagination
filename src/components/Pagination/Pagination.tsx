import React from 'react';
import './Pagination.css';

interface PaginationComponentProps {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
}

const Pagination: React.FC<PaginationComponentProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
  onPerPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, total);

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = parseInt(e.target.value, 10);

    if (onPerPageChange) {
      onPerPageChange(newPerPage);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={i === currentPage ? 'active' : ''}
          data-cy={`page-${i}`}
        >
          <a
            href="#"
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

  return (
    <div>
      <div data-cy="info">
        Page {currentPage} (items {startItem} - {endItem} of {total})
      </div>

      <nav>
        <ul className="pagination" data-cy="pagination">
          <li className={currentPage === 1 ? 'disabled' : ''}>
            <a
              href="#"
              aria-disabled={currentPage === 1}
              onClick={e => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
            >
              &laquo;
            </a>
          </li>

          {renderPageNumbers()}

          <li className={currentPage === totalPages ? 'disabled' : ''}>
            <a
              href="#"
              aria-disabled={currentPage === totalPages}
              onClick={e => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
            >
              &raquo;
            </a>
          </li>
        </ul>
      </nav>

      <select
        data-cy="perPageSelector"
        value={perPage}
        onChange={handlePerPageChange}
      >
        <option value={3}>3</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
};

export default Pagination;
