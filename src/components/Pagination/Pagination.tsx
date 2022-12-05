import classNames from 'classnames';
import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (num: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  function list(num: number): number[] {
    const arr = [];

    for (let i = 1; i <= num; i += 1) {
      arr.push(i);
    }

    return arr;
  }

  const correctList = list(Math.ceil(total / perPage));
  const firstItem = correctList[0];
  const lastItem = correctList[correctList.length - 1];

  function plus(num :number) {
    if (num === lastItem) {
      return lastItem;
    }

    return onPageChange(currentPage + 1);
  }

  function minus(num :number) {
    if (num === firstItem) {
      return firstItem;
    }

    return onPageChange(currentPage - 1);
  }

  return (
    <ul className="pagination">
      <li
        className={
          classNames('page-item', {
            disabled: currentPage === firstItem,
          })
        }
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === firstItem}
          onClick={() => minus(currentPage)}
        >
          «
        </a>
      </li>
      {correctList.map(item => (
        <li
          key={item}
          className={
            classNames('page-item', {
              active: currentPage === item,
            })
          }
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={() => onPageChange(+item)}
          >
            {item}
          </a>
        </li>
      ))}
      <li
        className={
          classNames('page-item', {
            disabled: currentPage === lastItem,
          })
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === lastItem}
          onClick={() => plus(currentPage)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
