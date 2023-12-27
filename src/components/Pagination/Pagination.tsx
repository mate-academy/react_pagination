import React from 'react';
import cn from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void
}
export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const countOfPages: number = Math.ceil(total / perPage);
  const pages: number[] = [];

  for (let i = 1; i <= countOfPages; i += 1) {
    pages.push(i);
  }

  const handleOnClickNext = () => {
    onPageChange(currentPage + 1);
  };

  const handleOnClickPrev = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        {currentPage === 1 ? (
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
          >
            «
          </a>
        ) : (
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="false"
            onClick={handleOnClickPrev}
          >
            «
          </a>
        )}
      </li>

      {pages.map(num => {
        return (
          <li
            className={cn('page-item', { active: currentPage === num })}
            key={num}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${num}`}
              onClick={() => onPageChange(num)}
            >
              {num}
            </a>
          </li>
        );
      })}

      <li className={cn('page-item',
        { disabled: currentPage === pages.length })}
      >
        {currentPage === countOfPages ? (
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="true"
          >
            »
          </a>
        ) : (
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
            onClick={handleOnClickNext}
          >
            »
          </a>
        )}
      </li>
    </ul>
  );
};
