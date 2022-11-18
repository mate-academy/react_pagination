import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const defaultItemPerPage = 5;
  const defaultCurrentPage = 1;
  const [itemPerPage, setItemPerPage] = useState(defaultItemPerPage);
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = currentPage * itemPerPage > items.length
    ? items.length
    : currentPage * itemPerPage;
  const itemsOnCurrentPage = items.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {
          `Page ${currentPage} (items ${startIndex + 1}`
          + ` - ${endIndex} of ${items.length})`
        }
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
              setCurrentPage(defaultCurrentPage);
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
        {itemsOnCurrentPage.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
