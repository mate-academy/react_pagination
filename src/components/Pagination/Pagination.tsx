import React from 'react';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlePrevClick}
        >
          «
        </a>
      </li>

      {Array.from({ length: totalPages }).map((_, index) => (
        <li
          key={index}
          className={`page-item ${index + 1 === currentPage && 'active'}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${index + 1}`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </a>
        </li>
      ))}

      <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={handleNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
