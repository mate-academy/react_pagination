import React from 'react';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total, perPage, currentPage, onPageChange,
}) => {
  const quantityPages = Math.ceil(total / perPage);
  const allPages: number[] = [];

  for (let i = 1; i <= quantityPages; i += 1) {
    allPages.push(i);
  }

  return (
    <ul className="pagination">
      <li className={currentPage === 1
        ? 'page-item disabled'
        : 'page-item'}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {allPages.map(pageNumber => (
        <li
          key={pageNumber}
          className={pageNumber === currentPage
            ? 'page-item active'
            : 'page-item'}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      ))}

      <li className={currentPage === quantityPages
        ? 'page-item disabled'
        : 'page-item'}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
