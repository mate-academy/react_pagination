import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const totalNumberItems = 42;
const items = getNumbers(1, totalNumberItems)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState('5');
  const [currentPage, setCurrentPage] = useState(1);
  const beginItem = +perPage * currentPage - +perPage + 1;
  const endItem = (+perPage * currentPage > totalNumberItems)
    ? totalNumberItems
    : +perPage * currentPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${beginItem} - ${endItem} of ${totalNumberItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(event) => {
              setPerPage(event.target.value);
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
        total={totalNumberItems}
        perPage={+perPage}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />

      <ul>
        {items.slice(beginItem - 1, endItem).map(item => {
          return (
            <li data-cy="item" key={item}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
