import React from 'react';
import cn from 'classnames';

import { getMaxNumberPage } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (p :number) => void;
};

function createPageNumbers(pagesQty: number): number[] {
  return Array.from(
    new Array(pagesQty),
    (_, index) => index + 1,
  );
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const maxPageNumber = getMaxNumberPage(total, perPage);
  const pageNumbers = createPageNumbers(maxPageNumber);

  const handlePreviousButton = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextButton = () => {
    if (currentPage < maxPageNumber) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn(
          'page-item',
          { disabled: currentPage === 1 },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlePreviousButton}
        >
          «
        </a>
      </li>
      {pageNumbers.map(pageNum => (
        <li
          key={pageNum}
          className={cn(
            'page-item',
            { active: currentPage === pageNum },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNum}`}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </a>
        </li>
      ))}
      <li
        className={cn(
          'page-item',
          { disabled: currentPage === maxPageNumber },
        )}
      >
        <a
          className="page-link"
          data-cy="nextLink"
          href="#next"
          aria-disabled={currentPage === maxPageNumber}
          onClick={handleNextButton}
        >
          »
        </a>
      </li>
    </ul>
  );
};
