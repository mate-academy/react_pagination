import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number;
  onPageChange: (page: number) => void
};

export const Pagination: React.FC<Props> = (
  {
    total,
    perPage,
    currentPage,
    onPageChange,
  },
) => {
  const maxPagesCount: number = Math.ceil(total / perPage);
  const pages: number[] = getNumbers(1, maxPagesCount);

  const isPrevPageDisabled: boolean = currentPage === 1;
  const isNextPageDisabled: boolean = currentPage === maxPagesCount;

  const prevPageClick = () => {
    if (!isPrevPageDisabled) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPageClick = () => {
    if (!isNextPageDisabled) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item',
        { disabled: isPrevPageDisabled })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPrevPageDisabled}
          onClick={prevPageClick}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          className={cn('page-item',
            {
              active: currentPage === page,
            })}
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
      <li className={cn('page-item',
        { disabled: isNextPageDisabled })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isNextPageDisabled}
          onClick={nextPageClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
