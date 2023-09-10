import React from 'react';
import cn from 'classnames';

import { PaginationOption } from '../../types/PaginationOption';
import { getNumbers } from '../../utils';
import { Page } from '../Page';

type Props = {
  paginationOption: PaginationOption,
  onPageChange: (value: number) => void,
};

export const Pagination: React.FC<Props> = ({
  paginationOption,
  onPageChange,
}) => {
  const pageCount = Math.ceil(paginationOption.total
    / paginationOption.perPage);

  const pages = getNumbers(1, pageCount).map(n => n);

  const isActivePrev = paginationOption.currentPage === 1;
  const isActiveNext = paginationOption.currentPage === pageCount;
  const startVal = paginationOption.currentPage;

  const onNextPageHandler = () => {
    if (paginationOption.currentPage < pageCount) {
      onPageChange(startVal + 1);
    }
  };

  const onPrevPageHandler = () => {
    if (paginationOption.currentPage > 1) {
      onPageChange(startVal - 1);
    }
  };

  return (
    <ul
      className="pagination"
    >
      <li className={cn(
        'page-item',
        { disabled: isActivePrev },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isActivePrev}
          onClick={onPrevPageHandler}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <Page
          key={page}
          page={page}
          selectedPage={paginationOption.currentPage}
          onSelectPage={onPageChange}
        />
      ))}

      <li className={cn(
        'page-item',
        { disabled: isActiveNext },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isActiveNext}
          onClick={onNextPageHandler}
        >
          »
        </a>
      </li>
    </ul>
  );
};
