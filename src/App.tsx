import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { PerPage } from './PerPage';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(PerPage.five);
  const [currPage, setCurrPage] = useState(1);
  const total = 42;

  const pagesCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pagesCount);
  const firstItem = (currPage - 1) * perPage;
  const lastItem = Math.min(currPage * perPage, total);
  const visibleItems = items.slice(firstItem, lastItem);

  const handelPageChange = (page: number) => {
    setCurrPage(page);
  };

  const handelPrevPage = () => {
    if (currPage > 1) {
      setCurrPage(prev => prev - 1);
    }
  };

  const handelNextPage = () => {
    if (currPage !== pages.length) {
      setCurrPage(next => next + 1);
    }
  };

  const handleSelectCountItems = (newPerPage: string) => {
    setPerPage(+newPerPage);
    setCurrPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currPage} (items ${firstItem + 1} - ${lastItem} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => handleSelectCountItems(event.target.value)}
          >
            <option value={PerPage.three}>3</option>
            <option value={PerPage.five}>5</option>
            <option value={PerPage.ten}>10</option>
            <option value={PerPage.twenty}>20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        pages={pages}
        currPage={currPage}
        handelPageChange={handelPageChange}
        handelPrevPage={handelPrevPage}
        handelNextPage={handelNextPage}
      />
      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
