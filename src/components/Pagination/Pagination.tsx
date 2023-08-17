import React from 'react';
import cn from 'classnames';

type Props = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  paginate,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  const handlePrevButton = (index: number) => {
    if (pageNumbers.includes(index - 1)) {
      paginate(index - 1);
    }
  };

  const handleNextButton = (index: number) => {
    if (pageNumbers.includes(index + 1)) {
      paginate(index + 1);
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
            onClick={() => paginate(number)}
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
