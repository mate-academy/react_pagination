import classNames from 'classnames';
import React from 'react';

type Props = {
  total: number,
  perPage: number,
  activePage: number,
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  activePage,
  onPageChange,
}) => {
  const maxPage = Math.ceil(total / perPage);
  const pages = Array.from({ length: maxPage }, (_, i) => i + 1);
  const isPrevDisabled = activePage === 1;
  const isNextDisabled = activePage === pages.length;

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: isPrevDisabled,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPrevDisabled}
          onClick={() => {
            onPageChange(activePage - 1);
          }}
        >
          «
        </a>
      </li>
      {pages.map((page) => (
        <li
          className={classNames('page-item', {
            active: activePage === page,
          })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => {
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: isNextDisabled,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isNextDisabled}
          onClick={() => {
            onPageChange(activePage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
