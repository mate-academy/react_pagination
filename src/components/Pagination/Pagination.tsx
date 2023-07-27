import cn from 'classnames';

import { getPageNumbers, getNumbers } from '../../utils';

type PaginationProps = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
  startIndex: number,
  endIndex: number,
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  startIndex,
  endIndex,
}: PaginationProps) => {
  const pageNumbers = getPageNumbers(total, perPage);
  const items = getNumbers(1, total).map(n => `Item ${n}`);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageNumbers.length;

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: isFirstPage })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>

        {pageNumbers.map(pageNumber => (
          <li
            key={pageNumber}
            className={cn('page-item',
              { active: currentPage === pageNumber })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${pageNumber}`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </a>
          </li>
        ))}

        <li className={cn('page-item', { disabled: isLastPage })}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={() => !isLastPage && onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items
          .slice(startIndex, endIndex)
          .map(item => (
            <li key={item} data-cy="item">{item}</li>
          ))}
      </ul>
    </>
  );
};
