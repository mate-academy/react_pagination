import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const perPageOptions: number[] = [3, 5, 10, 20];

  const [currPage, setCurrPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(perPageOptions[1]);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Ensure current page is valid if itemsPerPage changes
  React.useEffect(() => {
    if (currPage > totalPages) {
      setCurrPage(1);
    }
  }, [itemsPerPage, totalPages, currPage]);

  const startIndex: number = (currPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const currItems: string[] = items.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currPage} (items {startIndex + 1} -{' '}
        {Math.min(endIndex, items.length)} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={e => {
              setItemsPerPage(+e.target.value);
              setCurrPage(1);
            }}
          >
            {perPageOptions.map((o, i) => (
              <option key={i} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={itemsPerPage}
        currentPage={currPage}
        onPageChange={setCurrPage}
      />

      <ul>
        {currItems.map(item => {
          return (
            <li data-cy="item" key={item}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
