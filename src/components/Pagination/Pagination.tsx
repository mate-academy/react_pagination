import React from 'react';
import classNames from 'classnames';

type Props = {
  total: string;
  perPage: string;
  currentPage: string;
  onPageChange: (page: string) => void;
};

export const Pagination: React.FC<Props> = (
  {
    total,
    perPage,
    currentPage,
    onPageChange,
  },
) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(+total / +perPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      <li className={classNames('page-item', {
        disabled: +currentPage === pageNumbers[0],
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={+currentPage === pageNumbers[0] ? 'true' : 'false'}
          onClick={() => onPageChange(String(+currentPage - 1))}
        >
          «
        </a>
      </li>
      {pageNumbers.map(page => (
        <li
          className={classNames('page-item', { active: +currentPage === page })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(String(page))}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={classNames('page-item', {
        disabled: +currentPage === pageNumbers.length,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={+currentPage === pageNumbers.length ? 'true' : 'false'}
          onClick={() => onPageChange(String(+currentPage + 1))}
        >
          »
        </a>
      </li>
    </ul>
  );
};
