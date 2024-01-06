import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const total = 42;

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const startPoint = currentPage * perPage - perPage;
  const endPoint = currentPage * perPage;
  const options = [3, 5, 10, 20].map(n => `${n}`);

  function getEndPoint(value: number) {
    let end = value;

    if (value > total) {
      end = total;
    }

    return end;
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startPoint + 1} - ${getEndPoint(endPoint)} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(event) => {
              setPerPage(Number(event.target.value));
              setCurrentPage(1);
            }}
          >
            {options.map(x => (
              <option
                key={x}
              >
                {x}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page: number) => {
          setCurrentPage(page);
        }}
      />
      <ul>
        {items.slice(startPoint, endPoint).map(x => (
          <li key={x} data-cy="item">{x}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
