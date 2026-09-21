import React from 'react';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const pages: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  // Функции для стрелочек «Назад» и «Вперед»
  const handlePrev = (event: React.MouseEvent) => {
    event.preventDefault(); // чтобы страница не перезагружалась по ссылке
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (event: React.MouseEvent) => {
    event.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlePrev}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={`page-item ${currentPage === page ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={(event) => {
              event.preventDefault();
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
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={handleNext}
        >
          »
        </a>
      </li>
    </ul>
  );
};
