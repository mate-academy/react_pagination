import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const LAST_ITEM = 42;

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(LAST_ITEM);

  const itemsPrint = () => {
    return items.slice(currentPage * perPage - perPage,
      currentPage * perPage);
  };

  const selectChangeOfPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(parseInt(event.currentTarget.value, 10));
    setTotal(total);
    setCurrentPage(1);
  };

  const generateInfoText = () => {
    const startItem = currentPage * perPage - perPage + 1;
    const endItem = currentPage === Math.ceil(total / perPage)
      ? total
      : currentPage * perPage;

    return `Page ${currentPage} (items ${startItem} - ${endItem} of ${total})`;
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {generateInfoText()}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={5}
            onChange={selectChangeOfPage}
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
        onPageChange={setCurrentPage}
      />

      <ul>
        {itemsPrint().map((item) => (
          <li
            data-cy="item"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
