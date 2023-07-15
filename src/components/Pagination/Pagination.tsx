import cn from 'classnames';
import { getNumbers } from '../../utils';

type PaginationParams = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (currentPage: number) => void,
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: PaginationParams) => {
  const pages = getNumbers(1, Math.ceil(total / perPage));
  const firstItem = (currentPage - 1) * perPage + 1;
  const lastItem = Math.min(currentPage * perPage, total);
  const items = getNumbers(firstItem, lastItem);

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', currentPage === 1 && 'disabled')}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>

        {pages.map((page: number) => (
          <li
            className={cn('page-item', currentPage === page && 'active')}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={
            cn('page-item', currentPage === pages.length && 'disabled')
          }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages.length ? 'true' : 'false'}
            onClick={() => onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {items.map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {`Item ${item}`}
          </li>
        ))}
      </ul>
    </>
  );
};
