import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  startValue: number;
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void
};

export const Pagination: React.FC<Props> = ({
  startValue, total, perPage, currentPage, onPageChange,
}) => {
  const pages = getNumbers(startValue, Math.ceil(total / perPage));
  const isFirstItem = currentPage === startValue;
  const isLastItem = currentPage === pages.length;

  const handlePageChange = (buttonType: string, condition: boolean) => {
    const changePage = buttonType === 'prev'
      ? currentPage - startValue
      : currentPage + startValue;

    if (!condition) {
      onPageChange(changePage);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: isFirstItem })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstItem}
          onClick={() => handlePageChange('prev', isFirstItem)}
        >
          «
        </a>
      </li>
      {pages.map(page => {
        const isCurrent = page === currentPage;

        return (
          <li
            key={page}
            className={classNames('page-item', { active: isCurrent })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        );
      })}
      <li className={classNames('page-item', { disabled: isLastItem })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastItem}
          onClick={() => handlePageChange('next', isLastItem)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
