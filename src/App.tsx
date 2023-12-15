import React, { useState } from 'react';

import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import './App.css';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [select, setSelect] = useState(5);

  const lead = `Page ${currentPage} `
  + `(items ${(currentPage - 1) * select + 1} - `
  + `${Math.min(currentPage * select, 42)} of 42)`;

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelect = parseInt(event.target.value, 10);

    setSelect(newSelect);
    setCurrentPage(1);
  };

  const items = getNumbers(
    (currentPage - 1) * select + 1,
    Math.min(currentPage * select, 42),
  )
    .map(n => (
      <li data-cy="item" key={n}>
        {`Item ${n}`}
      </li>
    ));

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {lead}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            onChange={handleSelectChange}
            defaultValue={5}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
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
        perPage={select}
        currentPage={currentPage}
        onPageChange={
          (page: number) => {
            setCurrentPage(page);
          }
        }
      />

      <ul>
        {items}
      </ul>
    </div>
  );
};

export default App;
