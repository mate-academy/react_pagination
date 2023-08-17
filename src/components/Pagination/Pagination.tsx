import React from 'react';
import cn from 'classnames';

type Props = {
  currentPage: number;
  perPage: number;
  total: number;
  onPageChange: (pageNumber: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  perPage,
  total,
  onPageChange,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i += 1) {
    pageNumbers.push(i);
  }

  const handlePrevButton = (index: number) => {
    if (pageNumbers.includes(index - 1)) {
      onPageChange(index - 1);
    }
  };

  const handleNextButton = (index: number) => {
    if (pageNumbers.includes(index + 1)) {
      onPageChange(index + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item',
        { disabled: currentPage === pageNumbers[0] })}
      >
        <a
          onClick={() => handlePrevButton(currentPage)}
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
        >
          «
        </a>
      </li>

      {pageNumbers.map(number => (
        <li
          className={cn('page-item', { active: currentPage === number })}
          key={number}
        >
          <a
            onClick={() => onPageChange(number)}
            data-cy="pageLink"
            className="page-link"
            href={`#${number}`}
          >
            {number}
          </a>
        </li>
      ))}

      <li className={cn('page-item',
        { disabled: currentPage === pageNumbers[pageNumbers.length - 1] })}
      >
        <a
          onClick={() => handleNextButton(currentPage)}
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
        >
          »
        </a>
      </li>
    </ul>
  );
};
