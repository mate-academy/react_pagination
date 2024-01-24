import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const LAST_ITEM = 42;

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(LAST_ITEM);

  const itemsToPrint = () => {
    return items.slice(currentPage * perPage - perPage, currentPage * perPage);
  };

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(parseInt(event.currentTarget.value, 10));
    setTotal(total);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page
        {' '}
        {currentPage}
        {' '}
        (items
        {' '}
        {currentPage * perPage - perPage + 1}
        {' '}
        -
        {' '}
        {currentPage === Math.ceil(total / (perPage))
          ? total : currentPage * perPage}
        {' '}
        of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={this}
            defaultValue={5}
            onChange={onSelectChange}
            key={this}
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
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />

      <ul>
        {itemsToPrint().map((item) => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
