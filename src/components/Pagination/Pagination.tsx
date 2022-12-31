import type { MouseEvent, FC } from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (action: number | string) => void;
};

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = Math.ceil(total / perPage);
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);

  const nextClick = (e: MouseEvent) => {
    e.preventDefault();

    if (currentPage === pages) {
      return;
    }

    onPageChange('next');
  };

  const prevClick = (e: MouseEvent) => {
    e.preventDefault();
    if (currentPage === 1) {
      return;
    }

    onPageChange('prev');
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={e => prevClick(e)}
        >
          «
        </a>
      </li>
      {pageNumbers.map((page) => (
        <li
          className={cn('page-item', {
            active: page === currentPage,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={cn('page-item', {
        disabled: currentPage === pages,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages}
          onClick={e => nextClick(e)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
