import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const maxNum = 42;
const numbersArr = getNumbers(1, maxNum);
const items = numbersArr
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [numItemsPerPage, setNumItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(
    [...items].slice(currentPage * numItemsPerPage - numItemsPerPage,
      currentPage * numItemsPerPage),
  );

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setNumItemsPerPage(+event.target.value);
    setCurrentPage(1);
    setItemsPerPage(
      [...items].slice(0,
        +event.target.value),
    );
  }

  const onPageChange = (page:number) => {
    setCurrentPage(page);
    setItemsPerPage(
      [...items].slice(page * numItemsPerPage - numItemsPerPage,
        page * numItemsPerPage),
    );
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items 1 - 5 of ${maxNum})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={numItemsPerPage}
            onChange={handleChange}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={maxNum}
        perPage={numItemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <ul>
        {itemsPerPage.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
