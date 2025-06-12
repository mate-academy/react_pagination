import React from 'react';
import { ItemList } from '../ItemList/ItemLiss';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={event => {
              event.preventDefault();
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? 'active' : ''}`}
          >
            <a
              href={`#${page}`}
              className="page-link"
              onClick={e => {
                e.preventDefault();
                if (page !== currentPage) {
                  onPageChange(page);
                }
              }}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${currentPage < pageCount ? '' : 'disabled'}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage < pageCount ? 'true' : 'false'}
            onClick={event => {
              event.preventDefault();
              if (currentPage < pageCount) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
      <ItemList total={total} perPage={perPage} currentPage={currentPage} />
    </>
  );
};
