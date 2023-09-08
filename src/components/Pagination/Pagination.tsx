import React from 'react';
import cn from 'classnames';

interface Params {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

function checkCurrentPage(page: number, toCheckValue: number): boolean {
  return page === toCheckValue;
}

export const Pagination: React.FC<Params> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = Math.ceil(total / perPage);
  const pagesArr: number[] = [];
  let items: number[] = [];
  const itemsArr: Array<number[]> = [];

  for (let i = 1; i <= pages; i += 1) {
    pagesArr.push(i);
  }

  for (let i = 1; i <= total; i += 1) {
    items.push(i);

    if (items.length === perPage) {
      itemsArr.push(items);
      items = [];
    }
  }

  if (items.length !== 0) {
    itemsArr.push(items);
  }

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', {
          disabled: checkCurrentPage(currentPage, 1),
        })}
        >
          <a
            onClick={() => {
              if (!checkCurrentPage(currentPage, 1)) {
                onPageChange(currentPage - 1);
              }
            }}
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            // aria-disabled="true"
            aria-disabled={
              checkCurrentPage(currentPage, 1) ? 'true' : 'false'
            }
          >
            «
          </a>
        </li>
        {
          pagesArr.map(page => (
            <li
              className={cn('page-item', {
                active: page === currentPage, //!
              })}
            >
              <a
                onClick={() => onPageChange(page)}
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
              >
                {page}
              </a>
            </li>
          ))
        }
        <li className={cn('page-item', {
          disabled: checkCurrentPage(currentPage, pages),
        })}
        >
          <a
            onClick={() => {
              if (!checkCurrentPage(currentPage, pages)) {
                onPageChange(currentPage + 1);
              }
            }}
            data-cy="nextLink"
            className="page-link"
            href="#next"
            // aria-disabled="false"
            aria-disabled={
              checkCurrentPage(currentPage, pages) ? 'true' : 'false'
            }
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {
          itemsArr[currentPage - 1].map(item => (
            <li data-cy="item">{`Item ${item}`}</li>
          ))
        }
      </ul>
    </>
  );
};
