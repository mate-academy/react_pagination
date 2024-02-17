import React, { useState } from "react";
import "./App.css";
import { getNumbers } from "./utils";
import { Pagination } from "./components/Pagination";

const items = getNumbers(1, 42).map((n) => `Item ${n}`);

export const App: React.FC = () => {
  const copyItems = Object.assign(items);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [onPage, setOnPage] = useState<number>(5);

  const renderPerPage = (perPage: number, pageCurrent: number) => {
    const renderOnPage = perPage * pageCurrent - perPage;
    const sliceOnPage = copyItems.slice(renderOnPage, renderOnPage + perPage);

    return sliceOnPage;
  };

  const list = renderPerPage(onPage, currentPage);
  const rest = list.length % onPage === 0;

  const firstItem = rest
    ? copyItems.indexOf(list[list.length - 1]) - onPage + 2
    : copyItems.indexOf(list[list.length - 1]);

  const lastItem = copyItems.indexOf(list[list.length - 1]) + 1;
  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setOnPage(+e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${copyItems.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue="5"
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
        total={42}
        perPage={onPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        page={list}
      />
    </div>
  );
};

export default App;
