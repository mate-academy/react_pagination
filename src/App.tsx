import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const TOTAL = 42;
const items = getNumbers(1, TOTAL).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const offsetStart = (currentPage - 1) * itemsPerPage;
  const offsetEnds = offsetStart + itemsPerPage;

  const pageItems = items.slice(offsetStart, offsetEnds);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${offsetStart + 1} - ${Math.min(offsetStart + itemsPerPage, TOTAL)} of ${TOTAL})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={itemsPerPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleItemsPerPage}
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
        total={TOTAL} // total number of items to paginate
        perPage={itemsPerPage} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={handlePageChange}
      />

      <ul>
        {pageItems.map(it => {
          return (
            <li key={it} data-cy="item">
              {it}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
