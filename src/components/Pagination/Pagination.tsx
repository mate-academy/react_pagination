import React from 'react';
import { getNumbers } from '../../utils';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  firstIndex: number;
  lastIndex: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  firstIndex,
  lastIndex,
  onPageChange
}) => {
  const items: string[] = getNumbers(1, total).map(n => `Item ${n}`);
  const numbers: string[] = items.slice(firstIndex, lastIndex);
  const amountOfPages: number = Math.ceil(total / perPage);
  const listOfPages: number[] = Array.from(
    { length: amountOfPages },
    (_, index) => index + 1
  );

  return (
    <>
      <ul className="pagination">
        <li
          className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={
            currentPage > 1
              ? () => onPageChange(currentPage - 1)
              : undefined
          }
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
        {listOfPages.map((item) => {
          return (
            <li
              className={`page-item ${currentPage === item ? 'active' : ''}`}
              onClick={() => onPageChange(item)}
              key={item}
            >
              <a data-cy="pageLink" className="page-link" href={`#${item}`}>
                {item}
              </a>
            </li>
          );
        })}
        <li
          className={`page-item ${currentPage === amountOfPages ? 'disabled' : ''}`}
          onClick={
            currentPage < amountOfPages
              ? () => onPageChange(currentPage + 1)
              : undefined
          }
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
        {numbers.map(item => {
          return <li data-cy="item" key={item}>{item}</li>;
        })}
      </ul>
    </>
  );
};
