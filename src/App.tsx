import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setСurrentPage] = useState(1);
  const lastTotalIndex = currentPage * perPage;
  const firstTotalIndex = lastTotalIndex - perPage;
  const totalIndex = currentPage * perPage >= 42
    ? 42 : currentPage * perPage;
  const handleValueChange = (value: React.SetStateAction<number>) => {
    setPerPage(value);
    setСurrentPage(1);
  };

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
            onChange={event => {
              handleValueChange(+event.target.value);
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
        total={42}
        currentPage={currentPage}
        perPage={perPage}
        onPageChange={setСurrentPage}
      />

      <ul>
        {items.slice(firstTotalIndex, lastTotalIndex).map((item) => (
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
