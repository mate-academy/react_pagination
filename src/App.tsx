import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const ITEMS_PER_PAGE = [3, 5, 10, 20];
  const [selectedItemPerPage, setSelectedItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [total] = useState(items.length);

  const numberOfPages = Math.ceil(items.length / selectedItemPerPage);
  const pages = getNumbers(1, numberOfPages);

  const lastItemIndex = currentPage * selectedItemPerPage <= total
    ? (currentPage * selectedItemPerPage)
    : (total);

  const firtItemIndex = currentPage * selectedItemPerPage - selectedItemPerPage;

  const visibleItems = getNumbers(1, 42).slice(firtItemIndex, lastItemIndex).map(n => `Item ${n}`);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firtItemIndex + 1} - ${lastItemIndex} of 42)`}
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
              setCurrentPage(1);
            }}
          >
            {ITEMS_PER_PAGE.map((item) => (
              <option key={item} value={item}>{item}</option>
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
        onPageChange={(number) => setCurrentPage(number)}
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
