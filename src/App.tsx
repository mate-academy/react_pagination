import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handlePageChange = (newPageNumber: number) => {
    if (newPageNumber !== pageNumber) {
      setPageNumber(newPageNumber);
    }
  };

  const startIndex = pageNumber * itemsPerPage - itemsPerPage + 1;
  const endIndex =
    pageNumber * itemsPerPage > items.length
      ? items.length
      : pageNumber * itemsPerPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {pageNumber} (items {startIndex} - {endIndex} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => {
              setItemsPerPage(+event.target.value);
              setPageNumber(1);
            }}
            defaultValue={5}
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

      {/* Move this markup to Pagination */}
      <Pagination
        total={items}
        perPage={itemsPerPage}
        currentPage={pageNumber}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
