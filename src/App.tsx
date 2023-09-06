import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const startItemNumber = currentPage * perPage - perPage;
  const endItemNumber = currentPage * perPage;

  const changePerPage = (target: EventTarget & HTMLSelectElement) => {
    setPerPage(+target.value);
    setCurrentPage(1);
  };

  const getCountOfItems = (arr: string[]) => {
    return arr.slice(startItemNumber, endItemNumber);
  };

  const countOfItems = getCountOfItems(items);
  const lastCountOfItems = countOfItems[countOfItems.length - 1]
    .split(' ')
    .pop();

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItemNumber + 1} - ${lastCountOfItems} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={perPage}
            onChange={({ target }) => changePerPage(target)}
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
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {countOfItems.map(item => (<li data-cy="item" key={item}>{item}</li>))}
      </ul>
    </div>
  );
};

export default App;
