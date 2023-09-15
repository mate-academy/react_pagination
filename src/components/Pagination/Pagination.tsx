import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getNumbers, getSearchWith } from '../../utils';

type Props = {
  total: number,
};

export const Pagination: React.FC<Props> = ({ total }) => {
  const [searchParams] = useSearchParams();
  const perPage = Number(searchParams.get('perPage')) || 5;
  const currentPage = Number(searchParams.get('page')) || 1;
  const pageCount = Math.ceil(total / perPage);
  const firstPage = currentPage === 1;
  const lastPage = currentPage === pageCount;

  const handlePageChange = (pageNumber: number) => {
    return getSearchWith(searchParams, {
      page: String(pageNumber) || null,
    });
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: firstPage })}>
        <Link
          data-cy="prevLink"
          className="page-link"
          aria-disabled={firstPage}
          to={{
            search: !firstPage ? handlePageChange(currentPage - 1) : undefined,
          }}
        >
          «
        </Link>
      </li>

      {getNumbers(1, pageCount).map((pageNumber) => (
        <li
          key={pageNumber}
          className={classNames('page-item', {
            active: pageNumber === currentPage,
          })}
        >
          <Link
            data-cy="pageLink"
            className="page-link"
            to={{
              search:
                currentPage !== pageNumber
                  ? handlePageChange(pageNumber)
                  : undefined,
            }}
            onClick={(e) => {
              if (currentPage === pageNumber) {
                e.preventDefault();
              }
            }}
          >
            {pageNumber}
          </Link>
        </li>
      ))}

      <li className={classNames('page-item', { disabled: lastPage })}>
        <Link
          data-cy="nextLink"
          className="page-link"
          aria-disabled={lastPage}
          to={{
            search: !lastPage ? handlePageChange(currentPage + 1) : undefined,
          }}
        >
          »
        </Link>
      </li>
    </ul>
  );
};
