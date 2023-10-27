import React from 'react';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total, perPage, currentPage, onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => handlePageChange(currentPage - 1)}
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
              onClick={() => handlePageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages ? 'true' : 'false'}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {Array.from({ length: perPage }, (_, index) => {
          const itemIndex = (currentPage - 1) * perPage + index;

          if (itemIndex < total) {
            return (
              <li key={itemIndex} data-cy="item">
                {
                  `Item ${itemIndex + 1}`
                }
              </li>
            );
          }

          return null;
        })}
      </ul>
    </>
  );
};
