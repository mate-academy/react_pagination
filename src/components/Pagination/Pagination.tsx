import React from 'react';

interface Props {
  total: number;
  items: string[];
  perPage: number;
  currentPage: number;
  changePage: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  items,
  perPage,
  currentPage,
  changePage,
}) => {
  const quantityPages = Math.ceil(total / perPage);
  const pages = [];
  const pageItems = [];

  const start = (currentPage - 1) * perPage;
  const end = Math.min(start + perPage, total);

  for (let i = start; i < end; i++) {
    pageItems.push(
      <li data-cy="item" key={i}>
        {items[i]}
      </li>,
    );
  }

  for (let i = 1; i <= quantityPages; i++) {
    pages.push(
      <li
        key={i}
        className={`page-item ${currentPage === i ? 'active' : ''}`}
        onClick={() => changePage(i)}
      >
        <a data-cy="pageLink" className="page-link" href={`#${i}`}>
          {i}
        </a>
      </li>,
    );
  }

  return (
    <>
      <ul className="pagination">
        <li
          className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => changePage(Math.max(1, currentPage - 1))}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={`${currentPage === 1 ? 'true' : 'false'}`}
          >
            «
          </a>
        </li>

        {pages}

        <li
          className={`page-item ${currentPage === quantityPages ? 'disabled' : ''}`}
          onClick={() => changePage(Math.min(quantityPages, currentPage + 1))}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={`${currentPage === quantityPages ? 'true' : 'false'}`}
          >
            »
          </a>
        </li>
      </ul>

      <ul>{pageItems}</ul>
    </>
  );
};
