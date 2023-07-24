import React from 'react';
import cn from 'classnames';

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
  const lastItemOnPage = Math.ceil(total / perPage);
  const pageLinks = getNumbers(1, lastItemOnPage);

  function prevPage(page: number) {
    if (page > 1) {
      onPageChange(page - 1);
    }
  }

  function nextPage(page: number) {
    if (page < lastItemOnPage) {
      onPageChange(page + 1);
    }
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
          onClick={() => prevPage(currentPage)}
        >
          «
        </a>
      </li>

      {pageLinks.map(item => (
        <li className={cn('page-item', { active: item === currentPage })}>
          <a
            key={item}
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </a>
        </li>
      ))}

      <li className={cn(
        'page-item',
        { disabled: currentPage === lastItemOnPage },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          onClick={() => nextPage(currentPage)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
