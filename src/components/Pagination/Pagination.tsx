import React, { useEffect } from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onChange,
  onPerPageChange,
}) => {
  const pages = Math.ceil(total / perPage);
  const pageNumbers = getNumbers(1, pages);

  // Якщо currentPage вийшов за межі
  useEffect(() => {
    if (currentPage > pages && pages > 0) {
      onChange(pages);
    }
  }, [currentPage, pages, onChange]);

  if (pages <= 1) return null;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pages && newPage !== currentPage) {
      onChange(newPage);
    }
  };

  return (
    <div className="pagination-wrapper">
      {/* Пагінаційна інформація */}
      <p data-cy="info">
        Page {currentPage} (items {(currentPage - 1) * perPage + 1} -{' '}
        {Math.min(currentPage * perPage, total)} of {total})
      </p>

      {/* Селектор perPage */}
      <select
        data-cy="perPageSelector"
        value={perPage}
        onChange={e => onPerPageChange(+e.target.value)}
      >
        <option value={3}>3</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>

      {/* Кнопки пагінації */}
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={e => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
          >
            «
          </a>
        </li>

        {pageNumbers.map(page => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={e => {
                e.preventDefault();
                handlePageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}

        <li className={`page-item ${currentPage === pages ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages}
            onClick={e => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
          >
            »
          </a>
        </li>
      </ul>
    </div>
  );
};
