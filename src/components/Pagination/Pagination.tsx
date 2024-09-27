import React from 'react';
import classNames from 'classnames';
import {
  getLinkDataCy,
  getLinkHref,
  getLinkTextContent,
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
  const listOfPages = [...Array(pagesAmount + 2)].map((_n, i) => i + 1);

  function getOnClickCallback(index: number) {
    switch (index) {
      case 0:
        return currentPage !== 1
          ? () => onPageChange(currentPage - 1)
          : () => {};

      case pagesAmount + 1:
        return currentPage !== pagesAmount
          ? () => onPageChange(currentPage + 1)
          : () => {};

      default:
        return () => onPageChange(index);
    }
  }

  return (
    <ul className="pagination">
      {listOfPages.map((item, index) => {
        const isPrevDisabled = currentPage === 1 && index === 0;
        const isNextDisabled =
          currentPage === pagesAmount && index === pagesAmount + 1;

        const listItemClassName = classNames({
          'page-item': true,
          active: index === currentPage,
          disabled: isPrevDisabled || isNextDisabled,
        });

        return (
          <li key={item} className={listItemClassName}>
            <a
              key={item}
              onClick={getOnClickCallback(index)}
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
