import React, { useState } from "react";

import "./App.css";
import { getNumbers } from "./utils";
import { Pagination } from "./components/Pagination";

type HandleChange = (newPage: number, newPerPage: number) => void;

const items = getNumbers(1, 42).map((n) => `Item ${n}`);

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const itemQuantity = [3, 5, 10, 20];
  const [perPage, setPerPage] = useState(itemQuantity[1]);

  const totalPages = Math.ceil(items.length / perPage);
  const itemPerPage = items.slice((page - 1) * perPage, page * perPage);
  const fromItem = perPage * page - perPage + 1;
  const toItem = perPage * page;

  const handleChange: HandleChange = (newPage, newPerPage) => {
    setPage(newPage);
    setPerPage(newPerPage);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${fromItem} - ${Math.min(toItem, items.length)} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(e) => handleChange(1, Number(e.target.value))}
            value={perPage}
          >
            {itemQuantity.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={totalPages}
        currentPage={page}
        perPage={perPage}
        onPageChange={handleChange}
      />

      <ul>
        {itemPerPage.map((item) => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
