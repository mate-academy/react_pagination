import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = currentPage * itemPerPage > items.length
    ? items.length
    : currentPage * itemPerPage;
  const itemsOnCurrentPage = items.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${endIndex} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemPerPage}
            onChange={(event) => {
              setItemPerPage(Number(event.target.value));
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
        total={items.length}
        perPage={itemPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {
          itemsOnCurrentPage.map(item => (
            <li data-cy="item">{item}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default App;
