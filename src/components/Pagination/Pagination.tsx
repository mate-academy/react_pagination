import classNames from 'classnames';
import React from 'react';
import { getPages } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPage = Math.ceil(total / perPage);
  const arrayOfPages = getPages(1, totalPage);

  if (currentPage > totalPage) {
    /* eslint-disable */
    currentPage = 1;
  }

  const changePage = (number: number) => {
    onPageChange(number);
  };

  const handlePrevPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (

    <ul className="pagination">
      <li className={classNames('page-item', {
        disabled: currentPage === 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          «
        </a>
      </li>
      {arrayOfPages.map(number => {
        return (
          <li
            key={number}
            className={classNames('page-item', {
              active: number === currentPage,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${number}`}
              onClick={() => changePage(number)}
            >
              {number}
            </a>
          </li>
        );
      })}

      <li className={classNames('page-item', {
        disabled: currentPage === totalPage,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPage}
          onClick={handleNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
