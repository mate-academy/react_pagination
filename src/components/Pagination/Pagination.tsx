import classNames from 'classnames';
import React from 'react';
import ItemList from '../ItemList';

interface PaginationProps {
  total: string[];
  perPage: number;
  currentPage: number;
  PageChange: (value: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  PageChange,
}) => {
  const currentItemsLength = total.length / perPage;
  const currentPagesToPaginate = [];

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentItemsToRender = total.slice(startIndex, endIndex);

  for (let i = 0; i < currentItemsLength; i += 1) {
    currentPagesToPaginate.push(total[i]);
  }

  const changePage = (
    shift: number | undefined,
    pageNumber: number,
  ) => {
    if ((currentPage === 1 && shift === -1)
    || (currentPage === currentPagesToPaginate.length && shift === 1)) {
      return;
    }

    switch (shift) {
      case -1:
        PageChange(currentPage - 1);
        break;
      case 1:
        PageChange(currentPage + 1);
        break;
      default:
        PageChange(pageNumber);
        break;
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={classNames('page-item', { disabled: currentPage <= 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage < 2}
            onClick={() => changePage(-1, 0)}
          >
            «
          </a>
        </li>
        {currentPagesToPaginate.map((_item, i) => (
          <li
            key={_item}
            className={classNames('page-item', {
              active: currentPage === i + 1,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${i + 1}`}
              onClick={() => changePage(0, i + 1)}
            >
              {i + 1}
            </a>
          </li>
        ))}
        <li className={classNames('page-item',
          { disabled: currentPage === currentPagesToPaginate.length })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === currentPagesToPaginate.length}
            onClick={() => changePage(1, 0)}
          >
            »
          </a>
        </li>
      </ul>
      <ItemList currentItemsToRender={currentItemsToRender} />
    </>
  );
};
