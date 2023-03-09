import React, { useState } from 'react';
import './App.css';
import { getNumbers, getFirstRow, getLastRow } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const itemsList = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const initialPerPage = 5;
const initialCurrentPage = 1;

export const App: React.FC = () => {
  const [items] = useState(itemsList);
  const [perPage, setPerPage] = useState(initialPerPage);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);

  const changePerPage = (value: string) => {
    setCurrentPage(1);
    setPerPage(+value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${getFirstRow(perPage, currentPage)} - ${getLastRow(perPage, currentPage, items.length)} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(e) => {
              changePerPage(e.target.value);
            }}
            value={perPage}
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

        <Pagination
          items={items}
          perPage={perPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default App;
