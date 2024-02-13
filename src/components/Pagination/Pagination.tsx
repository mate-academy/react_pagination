import cn from 'classnames';
import React from 'react';

export interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pageCount) {
      return;
    }

    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn({
        'page-item': true,
        disabled: currentPage === 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {[...Array(pageCount).keys()].map(page => (
        <li
          className={cn({
            'page-item': true,
            active: currentPage === page + 1,
          })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page + 1}`}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </a>
        </li>
      ))}

      <li className={cn({
        'page-item': true,
        disabled: currentPage === pageCount,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageCount}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
