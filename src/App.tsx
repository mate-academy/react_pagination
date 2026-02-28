import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handleClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, total);

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
                handleClick(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {pageNumbers.map(n => (
          <li
            key={n}
            className={`page-item ${currentPage === n ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${n}`}
              onClick={e => {
                e.preventDefault();
                handleClick(n);
              }}
            >
              {n}
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
            aria-disabled={currentPage === totalPages ? 'true' : 'false'}
            onClick={e => {
              e.preventDefault();
              if (currentPage < totalPages) {
                handleClick(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startItem} - {endItem} of {total})
      </p>
    </>
  );
};

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const total = items.length;

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
          >
            {[3, 5, 10, 20].map(n => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
