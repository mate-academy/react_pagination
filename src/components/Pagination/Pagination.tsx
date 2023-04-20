/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-plusplus */
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
  const [url, setUrl] = useSearchParams();

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
          <Link
            data-cy="pageLink"
            className="page-link"
            to="/"
            onClick={() => onPageChange(currentPage - 1)}
          >
            «
          </Link>
        </li>

        {pageArr.map(page => {
          return (
            <li
              className={classNames('page-item', {
              active: page === currentPage,
            })}
              key={page}
            >
              {/* <Link
                data-cy="pageLink"
                className="page-link"
                to="/"
                onClick={() => {
                  onPageChange(page);
                  setUrl({ page: `${page}`, perPage: `${perPage}` });
                  window.console.log(url.get('page'));
                }}
              >
                {page}
              </Link> */}

              <a
                data-cy="pageLink"
                className="page-link"
                href={`/?${url}`}
                onClick={() => {
                  onPageChange(page);
                  setUrl({ page: `${page}`, perPage: `${perPage}` });
                  window.console.log(url.get('page'));
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
          <Link
            data-cy="nextLink"
            className="page-link"
            to={`?page=${currentPage + 1}&perPage=${perPage}`}
            aria-disabled={currentPage === pageNumbers ? 'true' : 'false'}
            onClick={() => onPageChange(currentPage + 1)}
          >
            »
          </Link>
        </li>
      </ul>
    </>
  );
});
