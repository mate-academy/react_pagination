import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(total / perPage);
  const pages: number[] = Array.from({ length: totalPages }, (_, i) => i + 1);
  const handleClick = (newPage: number) => {
    if (newPage !== currentPage && newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={e => {
            e.preventDefault();
            handleClick(currentPage - 1);
          }}
        >
          «
        </a>
      </li>

      {pages.map(p => (
        <li
          key={p}
          className={`page-item ${p === currentPage ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="#1"
            onClick={e => {
              e.preventDefault();
              handleClick(p);
            }}
          >
            {p}
          </a>
        </li>
      ))}

      <li
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages ? 'true' : 'false'}
          onClick={e => {
            e.preventDefault();
            handleClick(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
