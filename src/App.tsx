import React, { useState } from "react";
import "./App.css";
import { getNumbers } from "./utils";
import { Pagination } from "./components/Pagination/Pagination";

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const items = getNumbers(1, 42).map((n) => `Item ${n}`);

  const [current, setCurrent] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const handlePageChange = (page: number) => {
    setCurrent(page);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setCurrent(1);
  };

  const displayedItems: string[] = items.slice(
    (current - 1) * perPage,
    current * perPage
  );
  const startIndex: number = (current - 1) * perPage + 1;
  const endIndex: number = Math.min(current * perPage, items.length);
  const infoText = `Page ${current} (items ${startIndex} - ${endIndex} of ${items.length})`;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {infoText}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
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
        currentPage={current}
        onPageChange={handlePageChange}
      />

      <ul>
        {displayedItems.map((item: string) => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
