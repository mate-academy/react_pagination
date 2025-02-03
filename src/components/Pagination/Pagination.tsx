import classNames from 'classnames';
import { getNumbers } from '../../utils';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const maxPagination = Math.ceil(total / perPage);
  const paginations = getNumbers(1, maxPagination);
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    page: number,
  ) => {
    event.preventDefault();
    if (page < 1 || page > maxPagination || page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={event => handleClick(event, currentPage - 1)}
        >
          «
        </a>
      </li>

      {paginations.map(pagination => {
        return (
          <li
            className={classNames('page-item', {
              active: pagination === currentPage,
            })}
            key={pagination}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${pagination}`}
              onClick={event => handleClick(event, pagination)}
            >
              {pagination}
            </a>
          </li>
        );
      })}

      <li
        className={classNames('page-item', {
          disabled: currentPage === maxPagination,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === maxPagination}
          onClick={event => handleClick(event, currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
