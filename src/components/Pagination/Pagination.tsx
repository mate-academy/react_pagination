import cn from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';
import { START } from '../../constants';

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
  const amountPages = Math.ceil(total / perPage);
  const amountPagesArr = getNumbers(1, amountPages);

  const prevPage = () => {
    if (currentPage !== START.PAGE) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== amountPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: currentPage === START.PAGE,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === START.PAGE}
          onClick={prevPage}
        >
          «
        </a>
      </li>

      {amountPagesArr.map(pageItem => (
        <li
          className={cn('page-item', { active: pageItem === currentPage })}
          key={pageItem}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageItem}`}
            onClick={() => onPageChange(pageItem)}
          >
            {pageItem}
          </a>
        </li>
      ))}

      <li className={cn('page-item', {
        disabled: currentPage === amountPages,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === amountPages}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
