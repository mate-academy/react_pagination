import React from 'react';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>
      </li>
      {[...Array(totalPages)].map((_, index) => (
        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageClick(index + 1)}>
            {index + 1}
          </button>
        </li>
      ))}
      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </li>
    </ul>
  );
};
