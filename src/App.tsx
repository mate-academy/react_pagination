import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

enum ItemsPerPage {
  Three = 3,
  Five = 5,
  Ten = 10,
  Twenty = 20,
}

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState<ItemsPerPage>(
    ItemsPerPage.Five,
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalItems = 42;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {1 + (currentPage - 1) * itemsPerPage} -{' '}
        {currentPage !== totalPages
          ? itemsPerPage + (currentPage - 1) * itemsPerPage
          : 42}{' '}
        of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={ItemsPerPage.Five}
            onChange={e => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value="3">{ItemsPerPage.Three}</option>
            <option value="5">{ItemsPerPage.Five}</option>
            <option value="10">{ItemsPerPage.Ten}</option>
            <option value="20">{ItemsPerPage.Twenty}</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={totalItems}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
      <ul>
        {items
          .slice(
            (currentPage - 1) * itemsPerPage,
            (currentPage - 1) * itemsPerPage + itemsPerPage,
          )
          .map((item: string) => (
            <li data-cy="item" key={item}>
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
