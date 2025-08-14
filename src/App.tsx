import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<number>(5);
  const [currPage, setCurrPage] = useState<number>(1);

  const total = items.length;
  const start = (currPage - 1) * perPage;
  const end = start + perPage;

  function handleChangePage(num: number) {
    if (num >= 1 && num <= Math.ceil(total / perPage)) {
      setCurrPage(num);
    }
  }

  function selectPerPage(pageNum: number) {
    setPerPage(pageNum);
    setCurrPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currPage} (items {start + 1} - {Math.min(end, total)} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => selectPerPage(+e.target.value)}
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
        currentPage={currPage}
        perPage={perPage}
        onPageChange={page => {
          handleChangePage(page);
        }}
      />
      <ul>
        {items.slice(start, end).map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
