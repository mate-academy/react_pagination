import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC <Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageQty = getNumbers(1, Math.ceil(total / perPage));

  const handleArrowButton = (page: number) => {
    if (page >= 1
      && page <= pageQty.length
      && currentPage !== page) {
      onPageChange(page);
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
          onClick={() => handleArrowButton(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pageQty.map(pageNumber => (
        <li
          key={pageNumber}
          className={classNames('page-item', {
            active: pageNumber === currentPage,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      ))}
      <li className={classNames('page-item', {
        disabled: currentPage === pageQty.length,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageQty.length}
          onClick={() => handleArrowButton(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
