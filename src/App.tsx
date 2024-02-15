import React, { useState } from "react";
import "./App.css";
import { getNumbers } from "./utils";
import { Pagination } from "./components/Pagination";

const items: string[] = getNumbers(1, 42).map((n) => `Item ${n}`);
const totalItems: number = items.length;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const firstItemNumber: number = (currentPage - 1) * perPage + 1;
  let lastItemNumber: number = currentPage * perPage;

  if (lastItemNumber > totalItems) {
    lastItemNumber = totalItems;
  }

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemNumber} - ${lastItemNumber} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleItemsPerPageChange}
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
      />
      <ul>
        {getNumbers(firstItemNumber, lastItemNumber).map((item) => (
          <li data-cy="item" key={item}>
            Item {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
