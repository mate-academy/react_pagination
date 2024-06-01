import React from 'react';

interface Props {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const Pagination: React.FC<Props> = ({
  itemsPerPage,
  currentPage,
  totalItems,
  onPageChange,
  onPrevPage,
  onNextPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <ul className="pagination">
      <li className="page-item disabled">
        <a
          data-cy="prevLink"
          className="page-link"
          href="prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={onPrevPage}
        >
          «
        </a>
      </li>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;

        return (
          <li
            key={page}
            className={`page-item ${currentPage === page ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        );
      })}
      <li className="page-item">
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages ? 'true' : 'false'}
          onClick={onNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
