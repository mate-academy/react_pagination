import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageClick = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
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
          onClick={handlePageClick(currentPage - 1)}
        >
          «
        </a>
      </li>
      {getNumbers(1, totalPages).map((_, index) => {
        const page = index + 1;

        return (
          <li
            key={page}
            className={`page-item ${currentPage === page ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={handlePageClick(page)}
            >
              {page}
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
          onClick={handlePageClick(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = Number(searchParams.get('page')) || 1;
  const initialPerPage = Number(searchParams.get('perPage')) || 5;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialPerPage);

  useEffect(() => {
    setSearchParams({
      page: String(currentPage),
      perPage: String(itemsPerPage),
    });
  }, [currentPage, itemsPerPage, setSearchParams]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentItems = items.slice(startIdx, endIdx);
  const currentPageText = `Page ${currentPage} (items ${startIdx + 1} - ${Math.min(endIdx, items.length)} of ${items.length})`;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {currentPageText}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handlePerPageChange}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <ul>
        {currentItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
