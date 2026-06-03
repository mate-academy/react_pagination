import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const items = getNumbers(1, 42).map(n => `Item ${n}`);

type Item = string;

function preparedList(itemsList: Item[], page: number, itemsPerPage: number) {
  const firstElement = (page - 1) * itemsPerPage;
  const lastElement = firstElement + itemsPerPage;

  return [...itemsList].slice(firstElement, lastElement);
}

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const total = items.length;

  const firstItem = (page - 1) * itemsPerPage + 1;
  const lastItem = Math.min(firstItem - 1 + itemsPerPage, total);

  const preparedItems = preparedList(items, page, itemsPerPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${firstItem} - ${lastItem} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={e => {
              setItemsPerPage(+e.target.value);
              setPage(1);
            }}
            value={itemsPerPage}
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

      {/* Move this markup to Pagination */}
      <Pagination
        total={total}
        perPage={itemsPerPage}
        currentPage={page}
        onPageChange={setPage}
      />

      <ul>
        {preparedItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
