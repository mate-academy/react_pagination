import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

export const App: React.FC = () => {
  const [totalItems] = useState(42);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedPage, setSelectedPage] = useState(1);

  const firstItem = itemsPerPage * selectedPage - (itemsPerPage - 1);
  const lastItem = (itemsPerPage * selectedPage) <= totalItems
    ? (itemsPerPage * selectedPage)
    : totalItems;

  const items = getNumbers(firstItem, lastItem)
    .map(n => `Item ${n}`);

  const selectPage = (page: number, maxCountOfPages: number | undefined) => {
    if (maxCountOfPages && (page < 1 || page > maxCountOfPages)) {
      return;
    }

    setSelectedPage(page);
  };

  const changeItemsPerPage = (numOfPages: number): void => {
    setItemsPerPage(numOfPages);
    setSelectedPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${firstItem} - ${lastItem} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={event => changeItemsPerPage(+event.target.value)}
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
        perPage={itemsPerPage}
        currentPage={selectedPage}
        onChangePage={selectPage}
        items={items}
      />
    </div>
  );
};

export default App;
