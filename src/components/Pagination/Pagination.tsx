import { FC } from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: FC<Props> = ({
  currentPage,
  onPageChange,
  perPage,
  total,
}) => {
  const pagesCount = Math.ceil(total / perPage);

  const handleClick = (
    page: number,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    if (page !== currentPage && page >= 1 && page <= pagesCount) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={event => handleClick(currentPage - 1, event)}
        >
          «
        </a>
      </li>
      {[...Array(pagesCount)].map((_, idx) => {
        const page = idx + 1;

        return (
          <li
            className={cn('page-item', { active: currentPage === page })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={event => handleClick(page, event)}
            >
              {page}
            </a>
          </li>
        );
      })}
      <li className={cn('page-item', { disabled: currentPage === pagesCount })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesCount}
          onClick={event => handleClick(currentPage + 1, event)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
