import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  goToPage: (newPage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  goToPage,
}) => {
  return (
    <ul className="pagination">
      {/* Кнопка "Previous" */}
      <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={page === 1}
          onClick={e => {
            e.preventDefault();
            if (page > 1) {
              goToPage(page - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {/* Динамічні кнопки з номерами сторінок */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
        <li
          key={pageNum}
          className={`page-item ${pageNum === page ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNum}`}
            onClick={e => {
              e.preventDefault();
              goToPage(pageNum);
            }}
          >
            {pageNum}
          </a>
        </li>
      ))}

      {/* Кнопка "Next" */}
      <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={page === totalPages}
          onClick={e => {
            e.preventDefault();
            if (page < totalPages) {
              goToPage(page + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
