import React from 'react';
import classNames from 'classnames';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numberOfPages;
  const prevPage = currentPage - 1;
  const nexPage = currentPage + 1;

  return (
    <ul className="pagination">
      <li className={classNames('page-item', {
        disabled: isFirstPage,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => {
            if (!isFirstPage) {
              onPageChange(prevPage);
            }
          }}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          className={classNames('page-item', {
            active: currentPage === page,
          })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            aria-disabled={currentPage === page}
            onClick={() => {
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={classNames('page-item', {
        disabled: isLastPage,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => {
            if (!isLastPage) {
              onPageChange(nexPage);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
