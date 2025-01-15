import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= pageCount; i += 1) {
    pageNumbers.push(i);
  }

  const isHandlePrev = currentPage === 1;
  const isHandleNext = currentPage === pageCount;

  const handlePrev = () => {
    if (!isHandlePrev) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isHandleNext) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: isHandlePrev,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isHandlePrev}
          onClick={handlePrev}
        >
          «
        </a>
      </li>

      {pageNumbers.map(page => (
        <li
          className={cn('page-item', {
            active: currentPage === page,
          })}
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
        className={cn('page-item', {
          disabled: isHandleNext,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isHandleNext}
          onClick={handleNext}
        >
          »
        </a>
      </li>
    </ul>
  );
};
