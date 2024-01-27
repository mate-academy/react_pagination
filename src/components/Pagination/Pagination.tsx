import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (buttonPage: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const qtyPages = Math.ceil(total / perPage);
  const buttonsOnPage = getNumbers(1, qtyPages);
  const choosePage = (elementButton: number) => {
    if (elementButton <= buttonsOnPage.length
      && elementButton >= 1
      && elementButton !== currentPage) {
      onPageChange(elementButton);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => choosePage(currentPage - 1)}
        >
          «
        </a>
      </li>

      {buttonsOnPage.map((elementButton) => (
        <li
          key={elementButton}
          className={cn('page-item', { active: elementButton === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${elementButton}`}
            onClick={() => choosePage(elementButton)}
          >
            {elementButton}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: currentPage === qtyPages })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === qtyPages}
          onClick={() => choosePage(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
