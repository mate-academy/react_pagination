import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const items = getNumbers(1, 42).map(n => n);
// export const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [itemPerPage, setItemPerPage] = useState<number>(5);

  const handlePageChange = (argPage: number) => {
    setPage(argPage);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setItemPerPage(Number(e.target.value));
    setPage(1);
  };

  const start = itemPerPage * (page - 1) + 1;
  const end = Math.min(itemPerPage * page, items.length);

  const pageStart = itemPerPage * (page - 1);
  const pageEnd = itemPerPage * page;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {start} - {end} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemPerPage}
            onChange={e => handlePerPageChange(e)}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        total={items.length} // total number of items to paginate
        perPage={itemPerPage} // number of items per page
        currentPage={page} /* optional with 1 by default */
        onPageChange={handlePageChange}
      />

      <ul>
        {items
          .filter(item => item > pageStart && item <= pageEnd)
          .map(item => (
            <li data-cy="item" key={item}>
              Item {item}
            </li>
          ))}
        {/* <li data-cy="item">Item 1</li>
        <li data-cy="item">Item 2</li>
        <li data-cy="item">Item 3</li>
        <li data-cy="item">Item 4</li>
        <li data-cy="item">Item 5</li> */}
      </ul>
    </div>
  );
};

export default App;
