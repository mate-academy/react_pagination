import React from 'react';
import cn from 'classnames';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Array.from(
    { length: Math.ceil(total / perPage) },
    (_, i) => i + 1,
  );

  const isFirstPage = currentPage === pagesCount[0];
  const isLastPage = currentPage === pagesCount[pagesCount.length - 1];

  const handlePrevClick = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={
          cn(
            'page-item',
            { disabled: isFirstPage },
          )
        }
        key="prevLink"
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={handlePrevClick}
        >
          «
        </a>
      </li>

      {
        pagesCount.map(page => (
          <li
            className={
              cn('page-item',
                { active: page === currentPage })
            }
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
        ))
      }
      <li
        className={
          cn(
            'page-item',
            { disabled: isLastPage },
          )
        }
        key="nextLink"
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={handleNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
