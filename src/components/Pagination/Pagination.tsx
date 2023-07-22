import React from 'react';
import cn from 'classnames';
import {
  firstPageNumber,
  getNumbers,
  getTotalPages,
  lastPageNumber,
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
  onPageChange = () => {},

}) => {
  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', { disabled: currentPage === 1 })}
          role="presentation"
          onClick={() => onPageChange(currentPage - 1)}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled="true"
          >
            «
          </a>
        </li>

        {getNumbers(1, getTotalPages(total, perPage))
          .map(item => (
            <li
              className={cn('page-item', { active: currentPage === item })}
              key={item}
              role="presentation"
              onClick={() => {
                onPageChange(item);
              }}
            >
              <a data-cy="pageLink" className="page-link" href="#1">
                {item}
              </a>
            </li>
          ))}

        <li
          role="presentation"
          className={cn('page-item', {
            disabled: currentPage === getTotalPages(total, perPage),
          })}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled="false"
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {getNumbers(
          firstPageNumber(perPage, currentPage),
          lastPageNumber(perPage, currentPage, total),
        )
          .map(item => (
            <li data-cy="item" key={item}>
              {`Item ${item}`}
            </li>
          ))}
      </ul>
    </>
  );
};
