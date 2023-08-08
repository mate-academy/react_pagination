import React from 'react';

const renderPages = (
  pagesCount: number,
  activePage: number,
  onPageChange: (page: number) => void,
) => {
  const pages = [];

  for (let page = 1; page <= pagesCount; page += 1) {
    pages.push(
      <li
        className={
          `page-item ${page === activePage ? 'active' : ''}`
        }
        key={page}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${page}`}
          onClick={() => {
            if (page !== activePage) {
              onPageChange(page);
            }
          }}
        >
          {page}
        </a>
      </li>,
    );
  }

  return pages;
};

const renderItems = (
  activePage: number,
  itemsPerPage: number,
  totalItems: number,
) => {
  const items = [];
  const startItem: number = activePage * itemsPerPage + 1 - itemsPerPage;
  const endItem: number = Math.min(activePage * itemsPerPage, totalItems);

  for (let item = startItem; item <= endItem; item += 1) {
    items.push(
      <li data-cy="item" key={item}>
        {`Item ${item}`}
      </li>,
    );
  }

  return items;
};

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = (
  {
    total,
    perPage,
    currentPage,
    onPageChange,
  },
) => {
  const pagesCount: number = Math.ceil(total / perPage);
  const isDisabledLeftBtn = currentPage === 1;
  const isDisablesRightBtn = currentPage === pagesCount;

  return (
    <>
      <ul className="pagination">
        <li
          className={
            `page-item ${isDisabledLeftBtn ? 'disabled' : ''}`
          }
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isDisabledLeftBtn}
            onClick={() => {
              if (!isDisabledLeftBtn) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {renderPages(pagesCount, currentPage, onPageChange)}

        <li
          className={
            `page-item ${isDisablesRightBtn ? 'disabled' : ''}`
          }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isDisablesRightBtn}
            onClick={() => {
              if (!isDisablesRightBtn) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {renderItems(currentPage, perPage, total)}
      </ul>
    </>
  );
};
