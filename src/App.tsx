import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

type PerPage = 3 | 5 | 10 | 20;

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState<PerPage>(5);
  const [activePage, setActivePage] = useState(1);
  const from = (activePage - 1) * itemsPerPage;
  const to = from + itemsPerPage;
  const itemsPage = items.slice(from, to);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {activePage} (items {(activePage - 1) * itemsPerPage + 1} -{' '}
        {Math.min(activePage * itemsPerPage, items.length)} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setItemsPerPage(+event.target.value as PerPage);
              setActivePage(1);
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

      {/* Move this markup to Pagination */}
      <Pagination
        total={items.length}
        perPage={itemsPerPage}
        currentPage={activePage}
        onPageChange={(page: React.SetStateAction<number>) =>
          setActivePage(page)
        }
      />

      <ul>
        {itemsPage.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
