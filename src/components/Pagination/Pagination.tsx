import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = getNumbers(1, Math.ceil(total / perPage));

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
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => (currentPage !== 1
            ? onPageChange(currentPage - 1)
            : null)}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={classNames(
            'page-item',
            { active: page === currentPage },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => (page !== currentPage
              ? onPageChange(page)
              : null)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={classNames(
        'page-item',
        { disabled: currentPage === pages.length },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages.length ? 'true' : 'false'}
          onClick={() => (currentPage !== pages.length
            ? onPageChange(currentPage + 1)
            : null)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
