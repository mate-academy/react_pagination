import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`); // 5simbol

export const App: React.FC = () => {
  const [itemsPerPage, setItemPerPage] = useState(5);
  const [page, setPage] = useState(1);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>
      <p className="lead" data-cy="info">
        Page {page} ({'items'} {0 + itemsPerPage * (page - 1) + 1} -{' '}
        {itemsPerPage * page > items.length
          ? +items[items.length - 1].substring(5)
          : itemsPerPage * page}{' '}
        of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={itemsPerPage}
            onChange={e => {
              setItemPerPage(+e.target.value);
              setPage(1);
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
        total={items.length}
        perPage={itemsPerPage}
        currentPage={page}
        onPageChange={currentPage => setPage(currentPage)}
      />
      <ul>
        {items
          .slice(0 + itemsPerPage * (page - 1), itemsPerPage * page)
          .map(item => (
            <li key={item} data-cy="item">
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
