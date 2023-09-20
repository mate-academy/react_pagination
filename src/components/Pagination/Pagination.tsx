import React from 'react';

import classNames from 'classnames';

type Props = {
  total: number,
  perPage: number,
  currentPage: number
  onPageChange: (item: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageNumbers = [];

  /* eslint-disable no-plusplus */
  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handlenNextPage = () => {
    if (currentPage < pageNumbers.length) {
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
      {pageNumbers.map((item) => (
        <li
          className={classNames('page-item', {
            active: currentPage === item,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            key={item}
            onClick={() => onPageChange(item)}
          >
            {item}
          </a>
        </li>
      ))}

      <li className={classNames('page-item', {
        disabled: currentPage === pageNumbers.length,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageNumbers.length}
          onClick={handlenNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
