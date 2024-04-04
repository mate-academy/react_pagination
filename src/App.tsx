import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { useState } from 'react';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const lastPage = 42;

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [valuesPage, setValuesPage] = useState(5);

  const startIndex = (currentPage - 1) * valuesPage;
  let endIndex = currentPage * valuesPage;

  if (endIndex > lastPage) {
    endIndex = lastPage;
  }

  const handlePerPageChange = (perPageValue: number) => {
    setCurrentPage(1);
    setValuesPage(perPageValue);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {(currentPage - 1) * valuesPage + 1} -{' '}
        {Math.min(currentPage * valuesPage, lastPage)} of {lastPage})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={valuesPage}
            onChange={e => handlePerPageChange(+e.target.value)}
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
        total={lastPage}
        perPage={valuesPage}
        currentPage={currentPage}
        onPageChange={page => {
          setCurrentPage(page);
        }}
      />
      <ul>
        {items.slice(startIndex, endIndex).map((item, index) => (
          <li key={index} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
