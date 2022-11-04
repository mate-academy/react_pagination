import React from 'react';
import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const itemsPerPage = Math.ceil(total / perPage);
  const pages = Array(itemsPerPage).fill(1).map((num, i) => num + i);

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        { disabled: currentPage === 1 },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pages.map((page: number) => (
        <li
          className={classNames(
            'page-item',
            { active: page === currentPage },
          )}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => (page !== currentPage) && onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={classNames(
          'page-item',
          { disabled: currentPage === itemsPerPage },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === itemsPerPage}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
