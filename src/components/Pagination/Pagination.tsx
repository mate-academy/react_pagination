import React from 'react';
import cn from 'classnames';

import {
  getCountPages,
  getFirstItemGroup,
  getLastItemGroup,
  getNumbers,
} from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const items = getNumbers(1, total)
    .map(n => `Item ${n}`);

  return (
    <>
      <ul className="pagination">
        <li
          role="presentation"
          className={cn('page-item', {
            disabled: currentPage === 1,
          })}
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>

        {getNumbers(1, getCountPages(total, perPage)).map(num => (
          <li
            key={num}
            role="presentation"
            className={cn('page-item', {
              active: num === currentPage,
            })}
            value={num}
            onClick={(event) => onPageChange(+event.currentTarget.value)}
          >
            <a data-cy="pageLink" className="page-link" href="#{num}">
              {num}
            </a>
          </li>
        ))}

        <li
          role="presentation"
          className={cn('page-item', {
            disabled: currentPage === getCountPages(total, perPage),
          })}
          onClick={() => {
            if (currentPage !== getCountPages(total, perPage)) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === getCountPages(total, perPage)}
          >
            »
          </a>
        </li>
      </ul>

      {
        items.slice(
          getFirstItemGroup(currentPage, perPage),
          getLastItemGroup(currentPage, perPage),
        )
          .map(item => (
            <li key={item} data-cy="item">{item}</li>
          ))
      }
    </>
  );
};
