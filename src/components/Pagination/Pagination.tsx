import React from 'react';
import cn from 'classnames';

import { PaginationOption } from '../../types/PaginationOption';
import { getPages } from '../../services/utils';
import { Page } from '../Page';

type Props = {
  paginationOption: PaginationOption,
  onPageChange: (value: number) => void,
};

export const Pagination: React.FC<Props> = ({
  paginationOption,
  onPageChange,
}) => {
  const { total, perPage, currentPage } = paginationOption;

  const pageCount = Math.ceil(total
    / perPage);

  const pages = getPages(1, pageCount);

  const isActivePrev = currentPage === 1;
  const isActiveNext = currentPage === pageCount;
  const startVal = currentPage;

  const onNextPageHandler = () => {
    if (currentPage < pageCount) {
      onPageChange(startVal + 1);
    }
  };

  const onPrevPageHandler = () => {
    if (currentPage > 1) {
      onPageChange(startVal - 1);
    }
  };

  return (
    <ul className="pagination">
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
          selectedPage={currentPage}
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
