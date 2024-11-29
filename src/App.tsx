import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
// import { it } from 'node:test';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  // vars
  const [sortViewCount, setSortViewCount] = useState('5');
  const [currentPage, setCurrentPage] = useState(1);

  // vars for items
  const startIndex = (currentPage - 1) * Number(sortViewCount);
  const endIndex = startIndex + Number(sortViewCount);
  const currentItems = items.slice(startIndex, endIndex);

  // method to change count of pages
  const handlePageChange = (page: string) => {
    setCurrentPage(1);
    setSortViewCount(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${
          endIndex > items.length ? items.length : endIndex
        } of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={sortViewCount}
            onChange={event => {
              handlePageChange(event.target.value);
            }}
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
        total={items.length} // total number of items to paginate
        perPage={sortViewCount} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={value => {
          setCurrentPage(value);
        }}
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
