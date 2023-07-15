import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (currentPage: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = getNumbers(1, Math.ceil(total / perPage));

  return (
    <ul className="pagination">
      <li className={cn('page-item', currentPage === 1 && 'disabled')}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => (
            (currentPage !== 1) ? onPageChange(currentPage - 1) : null
          )}
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
          aria-disabled={(currentPage === pages.length) ? 'true' : 'false'}
          onClick={() => (
            (currentPage !== pages.length)
              ? onPageChange(currentPage + 1)
              : null
          )}
        >
          »
        </a>
      </li>
    </ul>
  );
};
