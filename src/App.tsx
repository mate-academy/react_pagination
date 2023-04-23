import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const totalItems = getNumbers(1, 42).map((n) => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const numberOfItems = totalItems.length;

  const indexOfFirstItemOnPage = (currentPage - 1) * itemsPerPage;
  const indexOfLastItemOnPage = indexOfFirstItemOnPage + itemsPerPage;

  const selectedItems = totalItems.slice(
    indexOfFirstItemOnPage,
    indexOfLastItemOnPage,
  );

  const itemsPerPageChangeHandler: React.ChangeEventHandler<
  HTMLSelectElement
  > = (event) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${indexOfFirstItemOnPage + 1} - ${Math.min(indexOfLastItemOnPage, numberOfItems)} of ${numberOfItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={itemsPerPageChangeHandler}
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
        total={numberOfItems}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <ul>
        {selectedItems.map((item) => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
