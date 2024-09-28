import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import Pagination from './components/Pagination/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPages] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChangePerPages = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPerPages(+event.target.value);
    setCurrentPage(1);
  };

  const startElement = (currentPage - 1) * perPage + 1;
  const endElement = Math.min(currentPage * perPage, 42);

  const showItems = items.slice(startElement - 1, endElement).map(item => (
    <li data-cy="item" key={item}>
      {item}
    </li>
  ));

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startElement} - {endElement} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleChangePerPages}
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
        total={42}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>{showItems}</ul>
    </div>
  );
};

export default App;
