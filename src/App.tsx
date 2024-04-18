import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const visibleItemsAmount = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [itemsPerPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visiblePerPage = currentPage * itemsPerPage;
  const endIndex =
    visiblePerPage > items.length ? items.length : visiblePerPage;
  const visibleItems = items.slice(startIndex, endIndex);

  const handlePerPageItemsChange = (value: number) => {
    setPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIndex + 1} - {endIndex} of{' '}
        {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={e => handlePerPageItemsChange(+e.target.value)}
          >
            {visibleItemsAmount.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {visibleItems.map(el => (
          <li key={el} data-cy="item">
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
