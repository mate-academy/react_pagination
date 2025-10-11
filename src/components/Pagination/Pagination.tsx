import type { MouseEvent } from 'react';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / perPage);

  const prevDisabled = currentPage <= 1 || totalPages === 0;
  const nextDisabled = currentPage >= totalPages || totalPages === 0;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, page: number) => {
    e.preventDefault();
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  return (
    <ul className="pagination">
      {/* Prev */}
      <li className={`page-item ${prevDisabled ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={prevDisabled}
          onClick={e => handleClick(e, currentPage - 1)}
        >
          «
        </a>
      </li>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => (
        <li
          key={i + 1}
          className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${i + 1}`}
            onClick={e => handleClick(e, i + 1)}
          >
            {i + 1}
          </a>
        </li>
      ))}

      {/* Next */}
      <li className={`page-item ${nextDisabled ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={nextDisabled}
          onClick={e => handleClick(e, currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
