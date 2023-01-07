import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  currentPage: number,
  pageQuantity: number,
  toNextPage: () => void;
  toPrevPage: () => void;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  pageQuantity,
  toNextPage,
  toPrevPage,
  onPageChange,
}) => {
  const pagesArr = getNumbers(1, pageQuantity);

  return (
    <ul className="pagination">
      <li className={
        classNames('page-item', { disabled: currentPage === 1 })
      }
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={toPrevPage}
        >
          «
        </a>
      </li>
      {pagesArr.map(page => (
        <li
          key={page}
          className={classNames('page-item',
            { active: page === currentPage })}
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
      ))}
      <li className={
        classNames('page-item',
          { disabled: currentPage === pageQuantity })
      }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageQuantity}
          onClick={toNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
