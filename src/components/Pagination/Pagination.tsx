import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (number: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
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

  const pageChangeHandler = (page: number) => {
    if (page > totalPages || page < 1 || page === currentPage) {
      return;
    }

    onPageChange(page);
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
          onClick={() => pageChangeHandler(currentPage - 1)}
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
            onClick={() => pageChangeHandler(page)}
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
          onClick={() => pageChangeHandler(currentPage - 1)}
        >
          »
        </Link>
      </li>
    </ul>
  );
};
