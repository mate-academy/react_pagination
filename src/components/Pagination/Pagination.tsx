import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getNumbers, getSearchWith } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const pages = useMemo(() => (
    getNumbers(1, Math.ceil(total / perPage))),
  [total, perPage]);
  const [searchParams] = useSearchParams();
  const isLastPage = currentPage === pages.length;

  return (
    <ul className="pagination">
      <li className={classNames('page-item', {
        disabled: currentPage === 1,
      })}
      >
        <Link
          data-cy="prevLink"
          className="page-link"
          aria-disabled={currentPage === 1}
          to={{
            search: getSearchWith(searchParams,
              { page: currentPage === 1 ? '1' : (currentPage - 1).toString() }),
          }}
        >
          «
        </Link>
      </li>
      {pages.map(pageNumber => (
        <li
          className={classNames('page-item', {
            active: currentPage === pageNumber,
          })}
          key={pageNumber}
        >
          <Link
            data-cy="pageLink"
            className="page-link"
            to={{
              search: getSearchWith(searchParams,
                { page: pageNumber.toString() }),
            }}
          >
            {pageNumber}
          </Link>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: isLastPage,
        })}
      >
        <Link
          data-cy="nextLink"
          className="page-link"
          aria-disabled={isLastPage}
          to={{
            search: getSearchWith(searchParams,
              {
                page: isLastPage
                  ? pages.length.toString()
                  : (currentPage + 1).toString(),
              }),
          }}
        >
          »
        </Link>
      </li>
    </ul>
  );
};
