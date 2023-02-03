import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const total = items.length;
  const from = currentPage * itemsPerPage - itemsPerPage;
  const to = currentPage * itemsPerPage > total
    ? total
    : currentPage * itemsPerPage;
  const itemsToShow = items.slice(from, to);

  const handlerItemsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${from + 1} - ${to} of ${total})` }
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(event) => {
              handlerItemsPerPage(event);
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
        total={items.length} // total number of items to paginate
        perPage={itemsPerPage} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />

      <ul>
        {itemsToShow.map(item => (
          <li data-cy="item" key={getRandomDigits()}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
