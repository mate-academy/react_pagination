import React from 'react';

type Props = {
  totalItems: number;
  itemsPerPage: number;
  currPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  totalItems,
  itemsPerPage,
  currPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages === 0) {
    return null;
  }

  return (
    <ul className="pagination">
      <li className={`page-item ${currPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currPage === 1}
          onClick={e => {
            e.preventDefault();
            if (currPage > 1) {
              onPageChange(currPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <li
          key={page}
          className={`page-item ${currPage === page ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={e => {
              e.preventDefault();
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={`page-item ${currPage === totalPages ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currPage === totalPages}
          onClick={e => {
            e.preventDefault();
            if (currPage < totalPages) {
              onPageChange(currPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
