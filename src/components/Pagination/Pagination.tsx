import React from 'react';
import classNames from 'classnames';

interface Props {
  total: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const generatePageNumbers = (total: number): number[] => {
  const pageNumbers = [];

  for (let i = 1; i <= total; i += 1) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};

export const Pagination: React.FC<Props> = ({
  total,
  currentPage,
  onPageChange,
}) => {
  const pageNumbers = generatePageNumbers(total);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < total) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item',
          { disabled: currentPage === 1 })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={handlePrevClick}
        >
          «
        </a>
      </li>
      {pageNumbers.map((pageNumber) => (
        <li
          key={pageNumber}
          className={classNames('page-item',
            { active: pageNumber === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#page-${pageNumber}`}
            aria-disabled="false"
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item',
          { disabled: currentPage === total })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === total ? 'true' : 'false'}
          onClick={handleNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
