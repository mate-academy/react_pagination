/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-plusplus */
import React from 'react';
import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = React.memo(({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageNumbers = Math.ceil(total / perPage);
  const pageArr = [];

  for (let i = 1; i <= pageNumbers; i++) {
    pageArr.push(i);
  }

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="/"
            onClick={(event) => {
              event.preventDefault();
              onPageChange(currentPage - 1);
            }}
          >
            «
          </a>
        </li>

        {pageArr.map(page => {
          return (
            <li
              className={classNames('page-item', {
              active: page === currentPage,
            })}
              key={page}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href="/"
                onClick={(event) => {
                  event.preventDefault();
                  onPageChange(page);
                }}
              >
                {page}
              </a>
            </li>
          );
        })}

        <li className={classNames('page-item', {
            disabled: currentPage === pageNumbers,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="/"
            aria-disabled={currentPage === pageNumbers ? 'true' : 'false'}
            onClick={(event) => {
              event.preventDefault();
              onPageChange(currentPage + 1);
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
});
