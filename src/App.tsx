import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsInPage, setItemsInPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const startItem = (currentPage - 1) * itemsInPage + 1;
  const endItem = currentPage * itemsInPage > items.length
    ? items.length
    : currentPage * itemsInPage;

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const visibleNumbers = getNumbers(startItem, endItem);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem} - ${endItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsInPage}
            onChange={(event) => {
              setItemsInPage(+event.target.value);
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
        itemsInPage={itemsInPage}
        currentPage={currentPage}
        onPageChange={changePage}
      />

      <ul>
        {visibleNumbers.map(num => (
          <li data-cy="item">
            {`Item ${num}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
