import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const updateTitle = (currentPage: number, countPerPage: number) => {
  const isLastPage = ((currentPage - 1) * countPerPage + 1)
  === items.length - 1;

  const from = (currentPage - 1) * countPerPage + 1;
  const to = isLastPage
    ? items.length
    : ((currentPage - 1) * countPerPage) + countPerPage;

  return `Page ${currentPage} (items ${from} - ${to} of ${items.length})`;
};

const getVisibleItems = (currentPage: number, countPerPage: number) => {
  const start = (currentPage - 1) * countPerPage;
  const end = countPerPage + start;

  return items.slice(start, end);
};

export const App: React.FC = () => {
  const [countPerPage, setCountPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState(
    items.slice(0, countPerPage),
  );

  useEffect(() => {
    const newVisibleItems = getVisibleItems(currentPage, countPerPage);

    setVisibleItems(newVisibleItems);
  }, [countPerPage, currentPage]);

  const changeCountPerPage = useCallback((newCount: number) => {
    setCountPerPage(newCount);
    setCurrentPage(1);
  }, []);

  const changeCurrentPage = useCallback((current: number) => {
    setCurrentPage(current);
  }, []);

  const title = updateTitle(currentPage, countPerPage);
  const countPages = Math.ceil(items.length / countPerPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {title}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={countPerPage}
            onChange={(event) => changeCountPerPage(+event.target.value)}
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
        current={currentPage}
        count={countPages}
        onChangeCurrentPage={changeCurrentPage}
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
