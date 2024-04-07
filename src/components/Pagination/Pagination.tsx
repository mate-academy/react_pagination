import React from 'react';

type Props = {
  perPage: number;
  currentPage: number;
  onPageChange: (currentPage: number) => void;
};

export const Pagination: React.FC<Props> = ({
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numbers = [...Array.from(Array(perPage + 1).keys()).slice(1)];

  function prevPage() {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== perPage) {
      onPageChange(currentPage + 1);
    }
  }

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={prevPage}
        >
          «
        </a>
      </li>
      {numbers.map((n, i) => (
        <li
          className={`page-item ${currentPage === n ? 'active' : ''}`}
          key={i}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${n}`}
            onClick={() => onPageChange(n)}
          >
            {n}
          </a>
        </li>
      ))}
      <li className={`page-item ${currentPage === perPage ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === perPage}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
