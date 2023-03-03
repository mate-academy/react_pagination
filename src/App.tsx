import React, { useState, ChangeEvent } from 'react';

import './App.css';

import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedValue, setSelectValue] = useState(5);

  const total = items.length;
  const visibleItems = items.slice(
    (currentPage - 1) * selectedValue,
    currentPage * selectedValue,
  );

  const firstItem = items.indexOf(visibleItems[0]) + 1;
  const lastItem = items.indexOf(visibleItems[visibleItems.length - 1]) + 1;

  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(+e.target.value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={selectedValue}
            onChange={onSelect}
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
        total={total}
        perPage={selectedValue}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {visibleItems.map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
