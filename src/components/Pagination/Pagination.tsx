import React from 'react';
import cn from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages: number = Math.ceil(total / perPage);
  const pageArr = [];

  for (let i = 1; i <= totalPages; i++) {
    pageArr.push(i);
  }

  const handlePageClick = (page: number) => {
    if (page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul>
      <li
        data-cy="prevLink"
        className={cn('page-item', { disabled: currentPage === 1 })}
        onClick={handlePrev}
      >
        «
      </li>

      {pageArr.map(element => (
        <li
          key={element}
          className={cn('page-item', element === currentPage ? 'active' : null)}
          onClick={() => handlePageClick(element)}
        >
          {element}
        </li>
      ))}

      <li
        data-cy="nextLink"
        className={cn('page-item', { disabled: currentPage === totalPages })}
        onClick={handleNext}
      >
        »
      </li>
    </ul>
  );
};
