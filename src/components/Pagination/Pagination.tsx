import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (buttonPage: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numOfPage = Math.ceil(total / perPage);
  const buttonsOnPage = getNumbers(1, numOfPage);

  const choosePage = (elementButton: number) => {
    if (elementButton !== currentPage) {
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
          onClick={() => currentPage !== 1 && choosePage(currentPage - 1)}
        >
          «
        </a>
      </li>

      {buttonsOnPage.map(button => (
        <li
          className={cn('page-item', { active: button === currentPage })}
          key={button}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${button}`}
            onClick={() => choosePage(button)}
          >
            {button}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: currentPage === numOfPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === numOfPage}
          onClick={() =>
            currentPage !== numOfPage && choosePage(currentPage + 1)
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
