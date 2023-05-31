import classNames from 'classnames';
import React from 'react';
import {
  getNumbers,
  pagesAmount,
  fromPageNumber,
  toPageNumber,
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
          role="presentation"
          className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => onPageChange(currentPage - 1)}
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

        {getNumbers(1, pagesAmount(total, perPage)).map(n => (
          <li
            key={n}
            value={n}
            role="presentation"
            className={classNames('page-item', {
              active: n === currentPage,
            })}
            onClick={(event) => onPageChange(+event.currentTarget.value)}
          >
            <a data-cy="pageLink" className="page-link" href={`#${n}`}>{n}</a>
          </li>
        ))}

        <li
          role="presentation"
          className={classNames('page-item', {
            disabled: currentPage === pagesAmount(total, perPage),
          })}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pagesAmount(total, perPage)}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {getNumbers(
          fromPageNumber(perPage, currentPage),
          toPageNumber(total, perPage, currentPage),
        ).map(n => (
          <li data-cy="item" key={n}>{`Item ${n}`}</li>
        ))}
      </ul>
    </>
  );
};
