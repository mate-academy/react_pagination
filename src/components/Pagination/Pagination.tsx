import React from 'react';

interface PropsPaginator {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PropsPaginator> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const prevDisabled = currentPage === 1;
  const nextDisable = currentPage === totalPages;

  return (
    <ul className="pagination">
      <li className={`page-item  ${prevDisabled ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={prevDisabled}
          onClick={() => !prevDisabled && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {[...Array(totalPages)].map((_, i) => {
        const index = i + 1;

        return (
          <li
            key={index}
            className={`page-item ${index === currentPage ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${index}`}
              onClick={() => onPageChange(index)}
            >
              {index}
            </a>
          </li>
        );
      })}

      <li className={`page-item ${nextDisable ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={nextDisable}
          onClick={() => !nextDisable && onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
