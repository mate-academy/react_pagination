/* eslint-disable max-len */
import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { Items } from './components/Items';
import { getNumbers } from './utils';

const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1); //номер сторінки
  const [itemPerPage, setItemPerPage] = useState(5); //кількість ітем на сторінці

  const indexOfLastItem = currentPage * itemPerPage;

  const indexOfFirstItem = indexOfLastItem - itemPerPage;

  const currentItem = items.slice(indexOfFirstItem, indexOfLastItem);

  const pageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = +event.target.value;

    setItemPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {indexOfFirstItem + 1} -{' '}
        {Math.min(indexOfLastItem, items.length)} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemPerPage}
            onChange={pageChange}
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
        itemPerPage={itemPerPage}
        totalItem={items.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <Items items={currentItem} />
    </div>
  );
};

export default App;
