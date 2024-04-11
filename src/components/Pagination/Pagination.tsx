import React from 'react';
import cn from 'classnames';
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
  const getCurrentPageItems = (): string[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return items.slice(startIndex, endIndex);
  };

  const handlePageClick = (page: number) => {
    if (currentPage === 1 && page === currentPage - 1) {
      return;
    }

    if (currentPage === totalPages && page === currentPage + 1) {
      return;
    }

    onPageChange(page);
  };

  return (
    <div>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
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
            className={cn('page-item', { active: currentPage === i + 1 })}
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
          className={cn('page-item', { disabled: currentPage === totalPages })}
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
