import * as React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  items: string[];
  perPageItems: string;
  selectedPage: number;
  maxPage: number;
  handlerSelectedPage: (numb: number) => void;
};

export const Pagination = ({
  items,
  perPageItems,
  selectedPage,
  maxPage,
  handlerSelectedPage,
}: Props) => {
  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${selectedPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={selectedPage === 1}
            onClick={() => {
              if (selectedPage !== 1) {
                handlerSelectedPage(selectedPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {getNumbers(1, maxPage).map(n => {
          return (
            <li
              className={`page-item ${n === selectedPage ? 'active' : ''}`}
              key={n}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href="#1"
                onClick={() => handlerSelectedPage(n)}
              >
                {n}
              </a>
            </li>
          );
        })}
        <li
          className={`page-item ${selectedPage === maxPage ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={selectedPage === maxPage}
            onClick={() => {
              if (selectedPage !== maxPage) {
                handlerSelectedPage(selectedPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items
          .filter((_item, index) => {
            const minItem = +perPageItems * (selectedPage - 1) + 1;
            const maxItem = +perPageItems * selectedPage;

            return index + 1 >= minItem && index + 1 <= maxItem;
          })
          .map(item => (
            <li data-cy="item" key={item}>
              {item}
            </li>
          ))}
      </ul>
    </>
  );
};
