import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState('5');
  const [currentPage, setCurrentPage] = useState(1);

  const startItemsPerPage = items.length
    - (items.length - (Number(perPage) * (currentPage - 1))) + 1;

  const endItemsPerPage = startItemsPerPage + Number(perPage) - 1 > items.length
    ? items.length
    : startItemsPerPage + Number(perPage) - 1;

  function changeCurrentPage(value: number) {
    setCurrentPage(value);
  }

  function changePerPage(value: string) {
    setPerPage(value);
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {
          `Page ${currentPage} (items ${startItemsPerPage} - ${endItemsPerPage} of ${items.length})`
        }
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={perPage}
            onChange={event => changePerPage(event.target.value)}
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
        total={items.length}
        perPage={Number(perPage)}
        currentPage={currentPage}
        // eslint-disable-next-line react/jsx-no-bind
        onPageChange={changeCurrentPage}
      />

    </div>
  );
};

export default App;
