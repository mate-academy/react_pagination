import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageSelector, setperPageSelector] = useState(5);
  const itemsLength = items.length;
  const totalPages = itemsLength / perPageSelector;
  const maxPagesAvailable = Number.isInteger(totalPages)
    ? totalPages
    : Math.ceil(totalPages);

  const handlePerPageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setperPageSelector(Number(e.currentTarget.value));
    setCurrentPage(0);
  };

  const handleSelectpage = (page: number) => {
    setCurrentPage(page);
  };

  const data = items.slice(
    currentPage * perPageSelector,
    currentPage * perPageSelector + perPageSelector,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage + 1} (items {currentPage * perPageSelector + 1} -{' '}
        {currentPage * perPageSelector + perPageSelector >= itemsLength
          ? itemsLength
          : currentPage * perPageSelector + perPageSelector}{' '}
        of {itemsLength})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePerPageSelect}
            value={perPageSelector}
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
        maxPagesAvailable={maxPagesAvailable}
        currentPage={currentPage}
        onSelectpage={handleSelectpage}
      />

      <ul>
        {data.map(i => (
          <li data-cy="item" key={i}>
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
