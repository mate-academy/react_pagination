import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const itemsPerPage: string[] = ['3', '5', '10', '20'];

const total = items.length;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const lastItemOnPage = Math.min(currentPage * perPage, total);
  const firstItemOnPage = ((currentPage - 1) * perPage) + 1;
  const filteredItems = items.slice((currentPage - 1)
  * perPage, currentPage * perPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemOnPage} - ${lastItemOnPage} of ${total})`}
      </p>
      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            onChange={(event) => {
              setPerPage(+event.target.value);
              setCurrentPage(1);
            }}
            value={perPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
          >
            {itemsPerPage.map(value => <option value={value}>{value}</option>)}
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
        onPageChange={handlePageChange}
      />
      <ul>
        {filteredItems.map((item) => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
