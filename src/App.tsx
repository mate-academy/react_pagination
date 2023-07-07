import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const totalItems = items.length;
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const startItem = perPage * currentPage - perPage + 1;
  const endItem
  = startItem + perPage - 1 > totalItems
    ? totalItems
    : startItem + perPage - 1;
  const visibleItems = items.slice(startItem - 1, endItem);
  const pageCount = getNumbers(1, Math.ceil(totalItems / perPage)).map(n => n);

  const selectHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (+e.target.value !== perPage) {
      setPerPage(+e.target.value);
      setCurrentPage(1);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} `}
        (
        {`items ${startItem} - ${endItem} of ${totalItems}`}
        )
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={selectHandler}
            value={perPage}
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
        total={totalItems}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        arrOfPages={pageCount}
      />
      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
