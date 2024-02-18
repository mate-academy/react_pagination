import React, { useState } from "react";
import "./App.css";
import { getNumbers } from "./utils";
import { Pagination } from "./components/Pagination";

const items = getNumbers(1, 42).map((n) => `Item ${n}`);

export const App: React.FC = () => {
  const copyItems = Object.assign(items);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [onPage, setOnPage] = useState<number>(5);

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setOnPage(+e.target.value);
    setCurrentPage(1);
  };

  const startIndex = currentPage * onPage - onPage;
  const lastIndex = Math.min(startIndex + onPage, copyItems.length);
  const visibleItems = items.slice(startIndex, lastIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${lastIndex} of ${copyItems.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={onPage}
            onChange={onChange}
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
        total={copyItems.length}
        perPage={onPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {visibleItems.map((item) => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
