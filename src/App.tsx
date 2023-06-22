import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(5);

  const amountOfItems = items.length;

  const firstItem = limitPerPage * currentPage - limitPerPage;
  const lastItem = limitPerPage * currentPage > amountOfItems ? amountOfItems  : limitPerPage * currentPage;

  const currentInfo = () => {

    return `Page ${currentPage} (items ${firstItem + 1} - ${lastItem} of ${amountOfItems})`;
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLimitPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const visibleItems = items.slice(firstItem, lastItem);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {currentInfo()}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={limitPerPage}
            onChange={handleSelect}
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
        total={amountOfItems}
        perPage={limitPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
