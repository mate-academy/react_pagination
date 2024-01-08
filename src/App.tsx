import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const MATRIX: number[] = [3, 5, 10, 20];
const TOTAL_AMOUNT = 42;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const begin = (currentPage * perPage) - perPage;
  const end = Math.min(begin + perPage, TOTAL_AMOUNT);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${begin + 1} - ${end} of ${TOTAL_AMOUNT})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleOnChange}
          >
            {MATRIX.map(number => (
              <option
                value={`${number}`}
                key={number}
              >
                {number}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={TOTAL_AMOUNT}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {getNumbers(begin + 1, end).map(item => (
          <li data-cy="item" key={item}>{`Item ${item}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
