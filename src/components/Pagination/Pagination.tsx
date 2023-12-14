import { FC, MouseEventHandler } from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type PaginationProps = {
  total: number;
  perPage: string;
  currentPage: string;
  onPageChange: (pageNo: string) => void;
};

export const Pagination: FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageNums: number[] = getNumbers(1, Math.ceil(total / +perPage));

  const handlePageChange: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    const target = event.target as HTMLAnchorElement;

    if (
      +target.id === +currentPage
      && target.id !== 'next'
      && target.id !== 'prev'
    ) {
      return;
    }

    if (
      (target.id === 'next' && +currentPage === pageNums.length)
      || (target.id === 'prev' && +currentPage === 1)
    ) {
      return;
    }

    onPageChange(target.id);
  };

  const isPrevDisabled: boolean = +currentPage === 1;
  const isNextDisabled = +currentPage === pageNums.length;

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: isPrevDisabled,
        })}
      >
        <a
          id="prev"
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPrevDisabled}
          onClick={handlePageChange}
        >
          «
        </a>
      </li>

      {
        pageNums.map(pageNum => (
          <li
            key={pageNum}
            className={cn('page-item', {
              active: +currentPage === pageNum,
            })}
          >
            <a
              id={`${pageNum}`}
              data-cy="pageLink"
              className="page-link"
              href={`#${pageNum}`}
              onClick={handlePageChange}
            >
              {pageNum}
            </a>
          </li>
        ))
      }

      <li
        className={cn('page-item', {
          disabled: isNextDisabled,
        })}
      >
        <a
          id="next"
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isNextDisabled}
          onClick={handlePageChange}
        >
          »
        </a>
      </li>
    </ul>
  );
};
