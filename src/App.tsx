import React, { useEffect, useState, useMemo } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

function getNumberOfPages(itemsPerPage: number, itemsCount: number) {
  return Math.ceil(itemsCount / itemsPerPage);
}

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [activePage, setActivePage] = useState(1);

  const itemsCount = 42;

  const numberOfPages = useMemo(
    () => getNumberOfPages(itemsPerPage, itemsCount),
    [itemsPerPage, itemsCount],
  );

  const firstItem = (activePage - 1) * itemsPerPage + 1;
  const lastItem = Math.min(activePage * itemsPerPage, itemsCount);

  const items = getNumbers(firstItem, lastItem);

  useEffect(() => {
    if (activePage > numberOfPages) {
      setActivePage(numberOfPages);
    }
  }, [numberOfPages, activePage]);

  useEffect(() => {
    setActivePage(1);
  }, [itemsPerPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {activePage} (items {firstItem} - {lastItem} of {itemsCount})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={e => setItemsPerPage(Number(e.target.value))}
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
        numberOfPages={numberOfPages}
        activePage={activePage}
        onPageChange={page => setActivePage(page)}
      />
      <ul>
        {items.map(n => (
          <li data-cy="item" key={n}>{`Item ${n}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
