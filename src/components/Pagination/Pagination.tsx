import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pageNumbers = getNumbers(1, totalPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const selectNextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const selectPrevPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames(
          'page-item',
          { disabled: isFirstPage },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={isFirstPage}
          onClick={selectPrevPage}
        >
          «
        </a>
      </li>
      {pageNumbers.map(number => {
        return (
          <li
            key={number}
            className={classNames(
              'page-item',
              { active: currentPage === number },
            )}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${number}`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </a>
          </li>
        );
      })}
      <li
        className={classNames(
          'page-item',
          { disabled: isLastPage },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={isLastPage}
          onClick={selectNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
