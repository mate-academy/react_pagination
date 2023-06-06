import React from 'react';

interface Props {
  currentPage: number,
  numbersPages: number[],
  onPageChange: (page: number) => void,
  next: () => void,
  prev: () => void,
}

export const Pagination: React.FC<Props> = ({
  currentPage, numbersPages, onPageChange, next, prev,
}) => {
  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
          onClick={prev}
        >
          «
        </a>
      </li>

      {numbersPages.map(page => (
        <li
          className={`page-item ${currentPage === page ? 'active' : ''}`}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={`page-item ${currentPage === numbersPages.length ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          onClick={next}
        >
          »
        </a>
      </li>
    </ul>
  );
};
