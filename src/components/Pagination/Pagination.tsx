import React from 'react';
import classNames from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          href="#prev"
          data-cy="prevLink"
          className="page-link"
          aria-disabled={currentPage === 1}
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) {
              handleClick(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={classNames('page-item', { active: currentPage === page })}
        >
          <a
            href={`#${page}`}
            data-cy="pageLink"
            className="page-link"
            onClick={(e) => {
              e.preventDefault();
              handleClick(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={classNames('page-item', { disabled: currentPage === totalPages })}>
        <a
          href="#next"
          data-cy="nextLink"
          className="page-link"
          aria-disabled={currentPage === totalPages}
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
              handleClick(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
