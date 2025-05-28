import cn from 'classnames';
import React from 'react';

interface Props {
  itemPerPage: number;
  totalItem: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

export const Pagination: React.FC<Props> = ({
  itemPerPage,
  totalItem,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItem / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (
    pageNumber: number,
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={e => {
            e.preventDefault();
            if (currentPage > 1) {
              setCurrentPage(prev => prev - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pageNumbers.map(num => (
        <li
          key={num}
          className={cn('page-item', { active: currentPage === num })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="#1"
            onClick={e => paginate(num, e)}
          >
            {num}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: currentPage === pageNumbers.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageNumbers.length}
          onClick={e => {
            e.preventDefault();
            if (currentPage < pageNumbers.length) {
              setCurrentPage(prev => prev + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
