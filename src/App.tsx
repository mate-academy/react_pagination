import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import Pagination from './components/Pagination/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const total = 42;
const items = getNumbers(1, total).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChangePerPages = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const calculatePageRange = (
    currentPageArg: number,
    perPageArg: number,
    totalArg: number,
  ) => {
    const startElement = (currentPageArg - 1) * perPageArg + 1;
    const endElement = Math.min(currentPageArg * perPageArg, totalArg);

    return { startElement, endElement };
  };

  // Использование:
  const { startElement, endElement } = calculatePageRange(
    currentPage,
    perPage,
    total,
  );

  const showItems = items.slice(startElement - 1, endElement).map(item => (
    <li data-cy="item" key={item}>
      {item}
    </li>
  ));

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startElement} - {endElement} of {total})
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
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>{showItems}</ul>
    </div>
  );
};

export default App;
