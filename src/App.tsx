import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const ItemPerPage = [3, 5, 10, 20];
  const [selectedItemPerPage, setSelectedItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const numberOfPages = Math.ceil(items.length / selectedItemPerPage);
  const pages = getNumbers(1, numberOfPages);

  const lastItemIndex = currentPage * selectedItemPerPage;

  const firtItemIndex = lastItemIndex - selectedItemPerPage;

  const visibleItems = getNumbers(1, 42).slice(firtItemIndex, lastItemIndex).map(n => `Item ${n}`);

  const handlePageChange = (number:number) => {
    setCurrentPage(number);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page 1 (items 1 - ${selectedItemPerPage} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={selectedItemPerPage}
            onChange={(event) => {
              setSelectedItemPerPage(+event.target.value);
            }}
          >
            {ItemPerPage.map((I) => (
              <option value={I}>{I}</option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        perPage={selectedItemPerPage}
        total={items.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        pages={pages}
      />
      <ul>
        {visibleItems.map((item) => (
          <li data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
