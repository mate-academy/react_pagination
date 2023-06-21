import React, { useEffect, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const defaultCountPerPage = 5;

  const [visibleItems, setVisibleItems] = useState(items
    .slice(0, defaultCountPerPage));
  const [countPerPage, setCountPerPage] = useState('5');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const start = (currentPage - 1) * +countPerPage;
    const end = +countPerPage + start;
    const newVisibleItems = items.slice(start, end);

    setVisibleItems(newVisibleItems);
  }, [countPerPage, currentPage]);

  const changeCountPerPage = (newCount: string) => {
    setCountPerPage(newCount);
    setCurrentPage(1);
  };

  const changeCurrentPage = (current:number) => {
    if (current - 1 < 0) {
      return;
    }

    if (current + 1 >= items.length) {
      return;
    }

    setCurrentPage(current);
  };

  const isLastPage = () => {
    return ((currentPage - 1) * +countPerPage + 1) === items.length - 1;
  };

  const from = (currentPage - 1) * +countPerPage + 1;
  const to = isLastPage()
    ? items.length
    : ((currentPage - 1) * +countPerPage) + +countPerPage;

  const title = `Page ${currentPage} (items ${from} - ${to} of ${items.length})`;

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
            onChange={(event) => changeCountPerPage(event.target.value)}
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
        count={Math.ceil(items.length / +countPerPage)}
        onChangeCurrentPage={changeCurrentPage}
      />
      <ul>
        {visibleItems.map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
