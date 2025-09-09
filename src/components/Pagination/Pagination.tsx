import React from 'react';
import { getNumbers } from '../../utils';
import classNames from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  onPageChange,
  currentPage = 1,
}) => {
  const pagesCount = perPage > 0 ? Math.ceil(total / perPage) : 0;
  const pagesArray = pagesCount > 0 ? getNumbers(1, pagesCount) : [];

  const selectPage = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const prevButton = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextButton = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (currentPage < pagesCount) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={prevButton}
        >
          «
        </a>
      </li>

      {pagesArray.map(page => (
        <li
          key={page}
          className={classNames('page-item', { active: currentPage === page })}
        >
          <a
            href={`#${page}`}
            data-cy="pageLink"
            className="page-link"
            onClick={e => {
              e.preventDefault();
              selectPage(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={classNames('page-item', {
          disabled: currentPage === pagesCount || pagesCount === 0,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesCount || pagesCount === 0}
          onClick={nextButton}
        >
          »
        </a>
      </li>
    </ul>
  );
};
