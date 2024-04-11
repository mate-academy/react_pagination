import React from 'react';
import { PaginationItems } from './PagItems';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  items: string[];
  itemsPerPage: number;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
  items,
  itemsPerPage,
}) => {
  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const getCurrentPageItems = (): string[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return items.slice(startIndex, endIndex);
  };

  return (
    <div>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => handlePageClick(currentPage - 1)}
          >
            «
          </a>
        </li>

        {Array.from({ length: totalPages }, (_, i) => (
          <li
            key={i + 1}
            className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${i + 1}`}
              onClick={() => handlePageClick(i + 1)}
            >
              {i + 1}
            </a>
          </li>
        ))}

        <li
          className={`page-item ${
            currentPage === totalPages ? 'disabled' : ''
          }`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages}
            onClick={() => handlePageClick(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>

      <PaginationItems items={getCurrentPageItems()} />
    </div>
  );
};
