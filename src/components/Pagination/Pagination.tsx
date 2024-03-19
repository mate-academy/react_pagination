import * as React from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';

type Props = {
  items: string[];
  itemsPerPage: string;
  selectedPage: number;
  maxPage: number;
  handlerSelectedPage: (numb: number) => void;
};

export const Pagination = ({
  items,
  itemsPerPage,
  selectedPage,
  maxPage,
  handlerSelectedPage,
}: Props) => {
  const handlerPrevlink = () => {
    if (selectedPage !== 1) {
      handlerSelectedPage(selectedPage - 1);
    }
  };

  const handlerNextLink = () => {
    if (selectedPage !== maxPage) {
      handlerSelectedPage(selectedPage + 1);
    }
  };

  // const className = cn({
  //   'page-item': true,
  //   disabled: selectedPage === 1,
  // });

  return (
    <>
      <ul className="pagination">
        <li
          className={cn({
            'page-item': true,
            disabled: selectedPage === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={selectedPage === 1}
            onClick={handlerPrevlink}
          >
            «
          </a>
        </li>
        {getNumbers(1, maxPage).map(n => {
          return (
            <li
              className={cn({
                'page-item': true,
                active: n === selectedPage,
              })}
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
          className={cn({
            'page-item': true,
            disabled: selectedPage === maxPage,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={selectedPage === maxPage}
            onClick={handlerNextLink}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {items.map((item, index) => {
          const minItem = +itemsPerPage * (selectedPage - 1) + 1;
          const maxItem = +itemsPerPage * selectedPage;

          if (index + 1 >= minItem && index + 1 <= maxItem) {
            return (
              <li data-cy="item" key={item}>
                {item}
              </li>
            );
          }

          return;
        })}
      </ul>
    </>
  );
};
