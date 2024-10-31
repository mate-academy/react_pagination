import cn from 'classnames';
import { FC } from 'react';
import { getPagesCounter } from '../../utils/pagination/getPagesCounter';
import { getTotalPage } from '../../utils/pagination/getTotalPage';

interface IPagination {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<IPagination> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = getTotalPage(total, perPage);
  const pageCounter = getPagesCounter(totalPages);

  const prevPageHandler = () =>
    currentPage - 1 < 1 ? undefined : onPageChange(currentPage - 1);

  const nextPageHandler = () =>
    currentPage + 1 > totalPages ? undefined : onPageChange(currentPage + 1);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage === 1}
          onClick={prevPageHandler}
        >
          «
        </a>
      </li>

      {pageCounter.map(page => (
        <li
          className={cn('page-item', { active: page === currentPage })}
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

      <li className={cn('page-item', { disabled: currentPage === totalPages })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage === totalPages}
          onClick={nextPageHandler}
        >
          »
        </a>
      </li>
    </ul>
  );
};
