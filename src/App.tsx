import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = 42;

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [countItemsPerPage, setCountItemsPerPage] = useState(3);

  const fromItem = (currentPage - 1) * countItemsPerPage + 1;
  const toItem = currentPage === Math.ceil(items / countItemsPerPage)
    ? items
    : currentPage * countItemsPerPage;

  const changeCountPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>
      <p className="lead" data-cy="info">
        {`Page ${currentPage} `
          + `(items ${fromItem} `
          + `- ${toItem}`
          + ` of ${items})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={countItemsPerPage}
            onChange={changeCountPerPage}
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
        total={items}
        perPage={countItemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {getNumbers(fromItem, toItem).map(n => (
          <li key={n} data-cy="item">{`Item ${n}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
