import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const DEFAULT_VALUES = {
  ITEMS: 42,
  PER_PAGE: 5,
  CURRENT_PAGE: 1,
  ITEMS_PER_PAGE: [3, 5, 10, 20],
};

export const App: React.FC = () => {
  const items = DEFAULT_VALUES.ITEMS;
  const [perPage, setPerPage] = useState(DEFAULT_VALUES.PER_PAGE);
  const [currentPage, setCurrentPage] = useState(DEFAULT_VALUES.CURRENT_PAGE);

  const getFirstItem = (itemsPerPage: number, page: number) => {
    return (itemsPerPage * page) - (itemsPerPage - 1);
  };

  const getLastItem = (
    itemsPerPage: number,
    page: number,
    maxItems: number,
  ) => {
    if ((itemsPerPage * page) >= maxItems) {
      return maxItems;
    }

    return itemsPerPage * page;
  };

  const itemsToRender = getNumbers(
    getFirstItem(perPage, currentPage),
    getLastItem(perPage, currentPage, items),
  );

  const handleChangePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(DEFAULT_VALUES.CURRENT_PAGE);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemsToRender[0]} - ${itemsToRender.at(-1)} of ${items})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(event) => handleChangePerPage(event)}
          >
            {DEFAULT_VALUES.ITEMS_PER_PAGE.map((num) => (
              <option
                value={num}
                key={num}
              >
                {num}
              </option>
            ))}
          </select>
        </div>

        <label
          htmlFor="perPageSelector"
          className="col-form-label col"
        >
          items per page
        </label>
      </div>

      <Pagination
        total={items}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ul>
        {itemsToRender.map((num) => (
          <li
            data-cy="item"
            key={num}
          >
            {`Item ${num}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
