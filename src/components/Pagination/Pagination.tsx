import cn from 'classnames';
import React from 'react';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (number: number) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pageNumbers: number[] = [];

  for (let i = 0; i < numberOfPages; i += 1) {
    pageNumbers.push(i + 1);
  }

  function handleMoveButtons(
    currentPageNumber: number,
    isPrevButtons: boolean,
  ) {
    if (isPrevButtons && currentPageNumber > 1) {
      return onPageChange(currentPageNumber - 1);
    }

    if (!isPrevButtons && currentPageNumber < numberOfPages) {
      return onPageChange(currentPageNumber + 1);
    }

    return 0;
  }

  const prevButton = (
    <li className={cn('page-item', {
      disabled: currentPage === 1,
    })}
    >
      <a
        data-cy="prevLink"
        className="page-link"
        href="#prev"
        aria-disabled={currentPage === 1}
        onClick={() => handleMoveButtons(currentPage, true)}
      >
        «
      </a>
    </li>
  );

  const afterButton = (
    <li className={cn('page-item', {
      disabled: currentPage === numberOfPages,
    })}
    >
      <a
        data-cy="nextLink"
        className="page-link"
        href="#next"
        aria-disabled={currentPage === numberOfPages}
        onClick={() => handleMoveButtons(currentPage, false)}
      >
        »
      </a>
    </li>
  );

  return (
    <ul className="pagination">
      {prevButton}
      {pageNumbers.map(pageNum => (
        <li
          className={cn('page-item', {
            active: pageNum === currentPage,
          })}
          key={pageNum}
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
      {afterButton}
    </ul>
  );
};
