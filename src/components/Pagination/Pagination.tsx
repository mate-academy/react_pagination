import React from 'react';
import cn from 'classnames';

type Props = {
  itemsForPage: number;
  allItems: string[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  itemsForPage,
  allItems,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(allItems.length / itemsForPage);

  const btnClickHandler = (i: number) => {
    setCurrentPage(i);
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: currentPage === 0,
        })}
        onClick={handlePrev}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 0}
        >
          «
        </a>
      </li>
      {Array.from({ length: totalPages }, (_, i) => (
        <li
          key={i}
          className={cn('page-item', {
            active: currentPage === i,
          })}
          onClick={() => btnClickHandler(i)}
        >
          <a data-cy="pageLink" className="page-link" href={`#${i + 1}`}>
            {i + 1}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', {
          disabled: currentPage === totalPages - 1,
        })}
        onClick={handleNext}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages - 1}
        >
          »
        </a>
      </li>
    </ul>
  );
};
