import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';
import { Items } from './components/Items';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [sortItems, setSortItems] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = sortItems * currentPage;
  const indexOfFirstItem = indexOfLastItem - sortItems;

  const maxItem = Math.min(indexOfLastItem, 42);

  const visibleItems = items.slice(indexOfFirstItem, indexOfLastItem);

  function setSelectPage(value: number) {
    setSortItems(value);
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${indexOfFirstItem + 1} - ${maxItem} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            defaultValue={5}
            className="form-control"
            onChange={(e) => setSelectPage(+e.target.value)}
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
        perPage={sortItems}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />

      <Items itemsList={visibleItems} />
    </div>
  );
};

export default App;
