import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;

        return (
          <li
            key={index}
            className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
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
        );
      })}
      <li
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={() => {
            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalItems = items.length;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, totalItems);
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIndex + 1} - {endIndex} of {totalItems})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              setPerPage(Number(event.target.value));
              setCurrentPage(1);
            }}
          >
            {[3, 5, 10, 20].map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={totalItems}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {visibleItems.map((item, index) => (
          <li key={index} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
