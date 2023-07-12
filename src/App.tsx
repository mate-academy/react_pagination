import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setСurrentPage] = useState(1);
  const lastTotalIndex = currentPage * perPage;
  const firstTotalIndex = lastTotalIndex - perPage;
  const visibleItems = items.slice(firstTotalIndex, lastTotalIndex);
  const totalIndex = currentPage * perPage >= 42
    ? 42 : currentPage * perPage;
  const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setСurrentPage(1);
  };

  const options = [3, 5, 10, 20];

  return (
    <div className="container">
      <h1>Items with Pagination</h1>
      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstTotalIndex + 1} - ${totalIndex} of 42)`}
      </p>
      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleValueChange}
          >
            {options.map(
              value => <option key={value} value={value}>{value}</option>,
            )}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={42}
        currentPage={currentPage}
        perPage={perPage}
        onPageChange={setСurrentPage}
      />

      <ul>
        {visibleItems.map((item) => (
          <li
            data-cy="item"
            key={item}
          >
            {`${item}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
