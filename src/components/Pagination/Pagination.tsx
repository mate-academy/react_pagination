import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  currentPage: number,
  totalPages: number,
  perPage: number,
  onPageChange: CallableFunction;
};

export const Pagination: React.FC<Props> = React.memo(
  ({
    totalPages,
    perPage,
    currentPage,
    onPageChange,
  }) => {
    const pages = getNumbers(1, Math.ceil(totalPages / perPage));

    return (
      <ul className="pagination">
        <li
          className={classNames(
            'page-item',
            { disabled: currentPage === 1 },
          )}
        >
          <Link
            data-cy="prevLink"
            className="page-link"
            to={`?page=${currentPage - 1}&perPage=${perPage}`}
            aria-disabled={currentPage === 1}
            onClick={() => {
              onPageChange({ currentPage: `${currentPage - 1}`, perPage: `${perPage}` });
            }}
          >
            «
          </Link>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={classNames(
              'page-item',
              { active: page === +currentPage },
            )}
          >
            <Link
              data-cy="pageLink"
              className="page-link"
              to={`?page=${page}&perPage=${perPage}`}
              onClick={() => {
                if (page !== currentPage) {
                  onPageChange({ page: `${page}`, perPage: `${perPage}` });
                }
              }}
            >
              {page}
            </Link>
          </li>
        ))}
        <li className={classNames(
          'page-item',
          { disabled: currentPage === pages.length },
        )}
        >
          <Link
            data-cy="nextLink"
            className={classNames(
              'page-link',
              { disabled: currentPage === pages.length },
            )}
            to={`?page=${currentPage !== pages.length ? currentPage + 1 : currentPage}&perPage=${perPage}`}
            aria-disabled={currentPage === pages.length}
            onClick={() => {
              if (currentPage !== pages.length) {
                onPageChange({ page: `${currentPage + 1}`, perPage: `${perPage}` });
              }
            }}
          >
            »
          </Link>
        </li>
      </ul>
    );
  },
);
