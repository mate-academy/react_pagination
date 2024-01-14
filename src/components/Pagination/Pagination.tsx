import classNames from 'classnames';
import React from 'react';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages: number[] = [];
  const pageCounter = Math.ceil(total / perPage);

  for (let i = 1; i <= pageCounter; i += 1) {
    pages.push(i);
  }

  return (
    <ul className="pagination">
      <li className={classNames('page-item',
        {
          disabled: currentPage === 1,
        })}
      >
        <a
          onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          className={classNames('page-item',
            {
              active: page === currentPage,
            })}
          key={page}
        >
          <a
            onClick={() => currentPage !== page && onPageChange(page)}
            data-cy="pageLink"
            className="page-link"
            href="#1"
          >
            {page}
          </a>
        </li>
      ))}
      <li className={classNames('page-item',
        {
          disabled: currentPage === pageCounter,
        })}
      >
        <a
          onClick={() => currentPage !== pageCounter
            && onPageChange(currentPage + 1)}
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageCounter ? 'true' : 'false'}
        >
          »
        </a>
      </li>
    </ul>
  );
};
