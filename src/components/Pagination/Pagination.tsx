import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const numberOfPages = getNumbers(1, totalPages);

  const setSearchParams = (nextPage: number) => {
    if (nextPage < 1) {
      return `?page=${1}&perPageSize=${perPage}`;
    }

    if (nextPage > totalPages) {
      return `?page=${totalPages}&perPageSize=${perPage}`;
    }

    return `?page=${nextPage}&perPageSize=${perPage}`;
  };

  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item',
          {
            disabled: currentPage === 1,
          },
        )}
      >
        <Link
          data-cy="prevLink"
          className="page-link"
          to={setSearchParams(currentPage - 1)}
          aria-disabled={currentPage === 1}
        >
          «
        </Link>
      </li>
      {numberOfPages.map((page: number) => (
        <li
          key={page}
          className={classNames(
            'page-item',
            {
              active: page === currentPage,
            },
          )}
        >
          <Link
            data-cy="pageLink"
            className="page-link"
            to={setSearchParams(page)}
          >
            {page}
          </Link>
        </li>
      ))}
      <li
        className={classNames(
          'page-item',
          {
            disabled: currentPage === totalPages,
          },
        )}
      >
        <Link
          data-cy="nextLink"
          className="page-link"
          to={setSearchParams(currentPage + 1)}
          aria-disabled={currentPage === totalPages}
        >
          »
        </Link>
      </li>
    </ul>
  );
};
