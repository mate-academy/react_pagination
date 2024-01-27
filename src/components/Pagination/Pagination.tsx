import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  onPage: number,
  currentPage: number,
  buttonPageChange: (buttonPage: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  onPage,
  currentPage,
  buttonPageChange,
}) => {
  const qtyPages = Math.ceil(total / onPage);
  const buttonsOnPage = getNumbers(1, qtyPages);
  const choosePage = (elementButton: number) => {
    buttonPageChange(elementButton);
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
