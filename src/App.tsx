import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42).map(n => `Item ${n}`);
const itemsPerPage = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const visibleItems = items.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const onPageChange = () => {
    const amountOfPages = Math.ceil(items.length / perPage);

    return Array.from({ length: amountOfPages }, (_, index) => index + 1);
  };

  const amountPages = onPageChange();

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ` +
          `${items.indexOf(visibleItems[0]) + 1} - ` +
          `${items.indexOf(visibleItems[visibleItems.length - 1]) + 1} of ` +
          `${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue="5"
            onChange={event => {
              setPerPage(Number(event.target.value));
              setCurrentPage(1);
            }}
          >
            {itemsPerPage.map(value => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        visibleItems={visibleItems}
        currentPage={currentPage}
        amountPages={amountPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default App;
