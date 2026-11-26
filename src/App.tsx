import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useState } from 'react';

const items = getNumbers(1, 42).map(n => `Item ${n}`);
const totalItems = items.length;

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const [startIndex, endIndex] = [
    currentPage * perPage - perPage,
    currentPage * perPage,
  ];

  const currentPageElements = items.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} `}
        {`(items ${startIndex + 1} - ${Math.min(endIndex, totalItems)} `}
        {`of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              const value = Number(event.target.value);

              setPerPage(value);
              setCurrentPage(1);
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
        total={totalItems}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => {
          setCurrentPage(page);
        }}
      />

      <ul>
        {currentPageElements.map(element => (
          <li key={element} data-cy="item">
            {element}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
