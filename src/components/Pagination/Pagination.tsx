import React from 'react';
import { getNumbers } from '../../utils';

export interface PaginationProps {
  total: number; // total de itens
  perPage: number; // itens por pagina
  currentPage?: number; // pagina atual
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,

}) => {
  const pagesCount = Math.ceil(total / perPage); // 5
  const pagesLink = getNumbers(1, pagesCount); // [1, 2, 3, e etc]

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={e => {
              e.preventDefault();
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {pagesLink.map(link => (
          <li
            key={link}
            className={`page-item ${link === currentPage ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${link}`}
              onClick={e => {
                e.preventDefault();
                if (link !== currentPage) {
                  onPageChange(link);
                }
              }}
            >
              {link}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${currentPage < pagesCount ? '' : 'disabled'}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage < pagesCount ? 'false' : 'true'}
            onClick={e => {
              e.preventDefault();
              if (currentPage < pagesCount) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>

    </>
  );
};
