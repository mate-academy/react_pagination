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
  const pagesCount = Math.ceil(total / perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;
  const pagesButtons = getNumbers(1, pagesCount);

  const handlePrevButton = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextButton = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageChange = (page: number) => {
    if (currentPage !== page) {
      onPageChange(page);
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
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={handlePrevButton}
        >
          «
        </a>
      </li>

      {pagesButtons.map(page => (
        <li
          key={page}
          className={classNames(
            'page-item',
            { active: page === currentPage },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={classNames(
          'page-item',
          { disabled: isLastPage },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={handleNextButton}
        >
          »
        </a>
      </li>
    </ul>
  );
};
