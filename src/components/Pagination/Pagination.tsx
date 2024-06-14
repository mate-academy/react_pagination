import React from 'react';
import classNames from 'classnames';

type Props = {
  currPerPage: number;
  totalItems: number;
  paginate?: (num: number) => void;
  currentPage: number;
  setCurrPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<Props> = ({
  currPerPage,
  totalItems,
  paginate,
  currentPage,
  setCurrPage,
}) => {
  const pageNumbers: number[] = [];
  const totalButtons = Math.ceil(totalItems / currPerPage);
  const isFirstPage: boolean = currentPage === 1;
  const isLastPage: boolean =
    currentPage === Math.ceil(totalItems / currPerPage);

  for (let i = 1; i <= totalButtons; i++) {
    pageNumbers.push(i);
  }

  const nextPage = () => {
    if (currentPage < Math.ceil(totalItems / currPerPage)) {
      setCurrPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrPage(prev => prev - 1);
    }
  };

  return (
    <>
      {' '}
      <ul className="pagination">
        <li className={classNames('page-item', { disabled: isFirstPage })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={prevPage}
          >
            «
          </a>
        </li>
        {pageNumbers.map(number => {
          const isActive = number === currentPage;

          return (
            <li
              className={`page-item ${isActive ? 'active' : ''}`}
              key={number}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${number}`}
                onClick={() => paginate?.(number)}
              >
                {number}
              </a>
            </li>
          );
        })}

        <li className={classNames('page-item', { disabled: isLastPage })}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={nextPage}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
