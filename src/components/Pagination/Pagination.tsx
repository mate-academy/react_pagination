import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);
  const pageButtons = getNumbers(1, pageCount);
  const firstPage = currentPage === 1;
  const lastPage = currentPage === pageCount;

  const handlePrevButton = () => {
    if (!firstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextButton = () => {
    if (!lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageChangeIfDifferent = (page: number) => {
    if (currentPage !== page) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', {
        disabled: firstPage,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={firstPage}
          onClick={handlePrevButton}
        >
          «
        </a>
      </li>

      {pageButtons.map(page => (
        <li className={classNames('page-item', {
          active: page === currentPage,
        })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            aria-disabled={firstPage}
            onClick={() => handlePageChangeIfDifferent(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={classNames('page-item', {
        disabled: lastPage,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={lastPage}
          onClick={handleNextButton}
        >
          »
        </a>
      </li>
    </ul>
  );
};
