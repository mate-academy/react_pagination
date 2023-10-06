import React, { useState } from 'react';
import './App.css';

import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import PaginationConstructor from './utils/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

enum DEFAULT {
  pageCount = 5,
  page = 1,
}

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT.pageCount);
  const [currentPage, setCurrentPage] = useState(DEFAULT.page);

  const preparedItems
    = new PaginationConstructor<typeof items[0]>(items, itemsPerPage);

  const getTitle = () => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min((
      currentPage - 1) * itemsPerPage + itemsPerPage,
    items.length);

    return `Page ${currentPage} (items ${start} - ${end} of ${items.length})`;
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {getTitle()}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={DEFAULT.pageCount}
            onChange={event => {
              setCurrentPage(DEFAULT.page);
              setItemsPerPage(+event.target.value);
            }}
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
        pagesCount={preparedItems.getPagesCount()}
        selectedPage={currentPage}
        selectPage={(value) => {
          setCurrentPage(value);
        }}
      />

      <ul>
        {
          preparedItems.getPage(currentPage - 1)
            .map((item) => (
              <li data-cy="item" key={item}>{item}</li>
            ))
        }
      </ul>
    </div>
  );
};

export default App;
