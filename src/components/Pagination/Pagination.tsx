import React from 'react';
import cn from 'classnames';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (choicePage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageItemCount = Math.ceil(total / perPage);

  const getVisiblePages = () => {
    const maxPages = 9;
    const halfWindow = Math.floor(maxPages / 2);

    let start = Math.max(1, currentPage - halfWindow);
    let end = Math.min(pageItemCount, currentPage + halfWindow);

    if (currentPage <= halfWindow) {
      end = Math.min(pageItemCount, maxPages);
    } else if (currentPage + halfWindow > pageItemCount) {
      start = Math.max(1, pageItemCount - maxPages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageItemsToShow = getVisiblePages();

  return (
    <div>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>
        {pageItemsToShow.map(item => (
          <li
            className={cn('page-item', { active: item === currentPage })}
            key={item}
          >
            <a
              aria-label={`Go to page ${item}`}
              data-cy="pageLink"
              className="page-link"
              href={`#${item}`}
              onClick={() => onPageChange(item)}
            >
              {item}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item', {
            disabled: currentPage === pageItemCount,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pageItemCount ? 'true' : 'false'}
            onClick={() => onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </div>
  );
};
