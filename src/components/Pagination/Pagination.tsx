import React from 'react';
import classNames from 'classnames';
import {
  getLinkDataCy,
  getLinkHref,
  getLinkTextContent,
  handleClickPagination,
} from './pagination-utils';

export interface Props {
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
  const pagesAmount = Math.ceil(total / perPage);

  return (
    <ul
      className="pagination"
      onClick={(event: React.MouseEvent<HTMLUListElement>) =>
        handleClickPagination(event, currentPage, pagesAmount, onPageChange)
      }
    >
      {[...Array(pagesAmount + 2)].map((_item, index) => {
        const key = Math.random().toFixed(5).slice(2);

        const isPrevDisabled = currentPage === 1 && index === 0;
        const isNextDisabled =
          currentPage === pagesAmount && index === pagesAmount + 1;

        const listItemClassName = classNames({
          'page-item': true,
          active: index === currentPage,
          disabled: isPrevDisabled || isNextDisabled,
        });

        return (
          <li key={key} className={listItemClassName}>
            <a
              data-cy={getLinkDataCy(index, pagesAmount)}
              className="page-link"
              href={getLinkHref(index, pagesAmount)}
              aria-disabled={isPrevDisabled || isNextDisabled}
            >
              {getLinkTextContent(index, pagesAmount)}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
