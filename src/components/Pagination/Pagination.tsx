import React from 'react';
import cn from 'classnames';

import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberPageLinks = Math.ceil(total / perPage);
  const pageLinks = getNumbers(1, numberPageLinks);

  const nextPageArrow = () => {
    if (currentPage < numberPageLinks) {
      onPageChange(currentPage + 1);
    }
  };

  const prevPageArrow = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const prevArrowDisabled = currentPage === 1;
  const nextArrowDisabled = currentPage === numberPageLinks;

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: prevArrowDisabled })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={prevArrowDisabled}
          onClick={prevPageArrow}
        >
          «
        </a>
      </li>

      {pageLinks.map(page => (
        <li
          key={page}
          className={cn('page-item', { active: page === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => (page === currentPage
              ? null
              : onPageChange(page))}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: nextArrowDisabled })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={nextArrowDisabled}
          onClick={nextPageArrow}
        >
          »
        </a>
      </li>
    </ul>
  );
};
