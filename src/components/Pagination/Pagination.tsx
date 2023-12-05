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
  const pagesCount = getNumbers(1, Math.ceil(total / perPage));

  const handleChangePage = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleNextPage = () => {
    if (currentPage !== pagesCount.length) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div>
      <ul className="pagination">
        <li
          className={classNames(
            'page-item',
            { disabled: currentPage === 1 },
          )}
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

        {pagesCount.map(page => (
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
              onClick={() => handleChangePage(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={classNames(
            'page-item',
            { disabled: currentPage === pagesCount.length },
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pagesCount.length}
            onClick={handleNextPage}
          >
            »
          </a>
        </li>
      </ul>
    </div>
  );
};
