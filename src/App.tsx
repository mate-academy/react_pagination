import React, { useEffect, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const NUMBER_OF_ITEMS = items.length;
const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_PER_PAGE = 5;

const getVisibleItems = (currentPage: number, perPage: number) => {
  return [...items.slice((currentPage * perPage) - perPage,
    currentPage * perPage)];
};

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const [visibleItems, setVisibleItems]
    = useState(getVisibleItems(DEFAULT_CURRENT_PAGE, perPage));

  useEffect(() => {
    setVisibleItems(getVisibleItems(currentPage, perPage));
  }, [currentPage, perPage]);

  const firstItemOnPage = visibleItems[0].slice(5);
  const lastItemOnPage = visibleItems[visibleItems.length - 1].slice(5);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemOnPage} - ${lastItemOnPage} of ${NUMBER_OF_ITEMS})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              setPerPage(+event.currentTarget.value);
              setCurrentPage(DEFAULT_CURRENT_PAGE);
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
        total={NUMBER_OF_ITEMS}
        perPage={perPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onPageChange={() => setVisibleItems(
          getVisibleItems(currentPage, perPage),
        )}
      />
      <ul>

        {visibleItems.map((item) => (
          <li data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
