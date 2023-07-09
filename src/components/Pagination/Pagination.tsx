import cn from 'classnames';
import { getNumbers } from '../../utils';

type PaginationType = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (arg0: number) => void,
};

export const Pagination: React.FC<PaginationType> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const NUMBER_OF_PAGES = Math.ceil(total / perPage);
  const IF_CURRENT_PAGE_IS_FIRST = currentPage === 1;
  const IF_CURRENT_PAGE_IS_LAST = currentPage === NUMBER_OF_PAGES;

  const ifPageChange = (page: number) => {
    if (
      page !== currentPage
      && page > 0
      && page <= NUMBER_OF_PAGES
    ) {
      return onPageChange(page);
    }

    return undefined;
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: IF_CURRENT_PAGE_IS_FIRST,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={IF_CURRENT_PAGE_IS_FIRST}
          onClick={() => ifPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {getNumbers(1, NUMBER_OF_PAGES).map(page => (
        <li
          className={cn('page-item', {
            active: page === currentPage,
          })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => ifPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: IF_CURRENT_PAGE_IS_LAST,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={IF_CURRENT_PAGE_IS_LAST}
          onClick={() => ifPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
