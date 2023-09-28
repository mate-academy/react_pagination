import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const total = items.length;
  const firstItem = (currentPage - 1) * itemsPerPage;
  const lastItem = (firstItem + itemsPerPage) < total
    ? firstItem + itemsPerPage
    : total;

  const preparedItems = [...items].slice(firstItem, lastItem);
  const str = `Page ${currentPage} (items ${firstItem + 1} - ${lastItem} of ${total})`;

  function selectChangeHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentPage(1);
    setItemsPerPage(+event.target.value);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {str}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={selectChangeHandler}
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
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />

      <ul>
        {preparedItems.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
