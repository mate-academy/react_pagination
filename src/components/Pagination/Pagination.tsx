import classNames from 'classnames';
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
  currentPage,
  onPageChange,
}) => {
  const pageNum = currentPage ?? 1;
  const totalPages = Math.ceil(total / perPage);
  const pages = [...Array(totalPages)].map((_, i) => i + 1);

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: pageNum === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={event => {
            if (pageNum !== 1) {
              event.preventDefault();
              onPageChange(pageNum - 1);
            }
          }}
          aria-disabled={pageNum === 1}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={classNames('page-item', {
            active: page === pageNum,
          })}
        >
          <a
            data-cy="pageLink"
            onClick={event => {
              event.preventDefault();
              onPageChange(page);
            }}
            className="page-link"
            href={`#${page}`}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={classNames('page-item', {
          disabled: pageNum === pages[pages.length - 1],
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={event => {
            if (pageNum !== pages[pages.length - 1]) {
              event.preventDefault();
              onPageChange(pageNum + 1);
            }
          }}
          aria-disabled={pageNum === pages[pages.length - 1]}
        >
          »
        </a>
      </li>
    </ul>
  );
};
