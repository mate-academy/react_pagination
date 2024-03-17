import React, { useState } from 'react';
import './App.css';
// import { getNumbers } from './utils';

// import { event } from 'cypress/types/jquery';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const App: React.FC = () => {
  const totalItems = 42;
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  function currentStateOfList(): string {
    const startOf = (currentPage - 1) * itemsPerPage + 1;
    let endOf = (currentPage - 1) * itemsPerPage + itemsPerPage;

    if (endOf > totalItems) {
      endOf = totalItems;
    }

    return `Page ${currentPage} (items ${startOf} - ${endOf} of 42)`;
  }

  function selectListOnChange(value: string): void {
    const valueNormalize = Number(value);

    if (valueNormalize !== itemsPerPage) {
      setItemsPerPage(valueNormalize);
      setCurrentPage(1);
    }
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {currentStateOfList()}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => selectListOnChange(event.target.value)}
            defaultValue="5"
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

      {/* Move this markup to Pagination */}

      <Pagination
        total={totalItems}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
