import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const getVisibleItems = (perPage: number, currentPage: number) => {
  const lastIndex = perPage * currentPage;

  return items.slice(lastIndex - perPage, lastIndex);
};

export const App: React.FC = () => {
  const [currPage, setCurrPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [total] = useState(items.length);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
    setCurrPage(1);
  };

  const onPageChange = (page: number) => {
    setCurrPage(page);
  };

  const visibleItems = getVisibleItems(perPage, currPage);

  const getFirstItem = () => {
    return (currPage - 1) * perPage + 1;
  };

  const getLastItem = () => {
    const last = currPage * perPage;

    return last > items.length ? items.length : last;
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currPage} (items ${getFirstItem()} - ${getLastItem()} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleSelectChange}
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
        total={total}
        perPage={perPage}
        currentPage={currPage}
        onPageChange={onPageChange}
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
