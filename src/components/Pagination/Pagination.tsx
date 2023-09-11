import cn from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

interface Props {
  itemsPerPage: number,
  total: number,
  currentPage: number,
  onPageChange: (numberOfPage: number) => void,
}
export const Pagination: React.FC<Props> = ({
  itemsPerPage,
  total,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / itemsPerPage);
  const visiblePages = getNumbers(1, numberOfPages);

  function toNextPage() {
    return currentPage < numberOfPages && onPageChange(currentPage + 1);
  }

  function toPrevPage() {
    return currentPage > 1 && onPageChange(currentPage - 1);
  }

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', {
          disabled: currentPage === 1,
        })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={toPrevPage}
          >
            «
          </a>
        </li>
        {visiblePages.map(page => {
          const isActive = cn({
            active: currentPage === page,
          });

          function onClickHandler() {
            return currentPage !== page && onPageChange(page);
          }

          return (
            <li className={`page-item ${isActive}`} key={page}>
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
                onClick={onClickHandler}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li className={cn('page-item', {
          disabled: currentPage === numberOfPages,
        })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === numberOfPages}
            onClick={toNextPage}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
