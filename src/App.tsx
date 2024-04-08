import React from "react";
import { useState } from "react";
import "./App.css";
import { Pagination } from "./components/Pagination";
import { getNumbers } from "./utils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map((n) => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, changeitemsPerPage] = useState<number>(5);
  const [currentItem, changeItem] = useState(0);

  const handleChange = (evt: number) => {
    changeItem(evt);
  };

  const handleItemsPerpage = (evt: number) => {
    changeitemsPerPage(evt);
    changeItem(0);
  };

  const firstItemOnPage = currentItem * itemsPerPage + 1;
  const lastItemOnPage = currentItem * itemsPerPage + itemsPerPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentItem + 1} (items ${firstItemOnPage} - ${
          lastItemOnPage <= items.length ? lastItemOnPage : items.length
        } of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(evt) => handleItemsPerpage(parseInt(evt.target.value))}
            value={itemsPerPage}
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
        perPage={itemsPerPage}
        currentPage={currentItem}
        onPageChange={handleChange}
      />
    </div>
  );
};

export default App;
