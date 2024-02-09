import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);

  const perPageOptions: number[] = [3, 5, 10, 20];
  const total: number = items.length;
  const itemFromIndex: number = (currentPage - 1) * perPage;
  const itemToIndex: number = currentPage * perPage;
  const itemFrom: number = itemFromIndex + 1;
  const itemTo: number = itemToIndex > total ? total : itemToIndex;
  const paginationItems: number[] = getNumbers(itemFrom, itemTo);
  const maxPagesCount: number = Math.ceil(total / perPage);

  const paginationInfo = `Page ${currentPage} (items ${itemFrom} - ${itemTo} of ${total})`;

  if (currentPage > maxPagesCount) {
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {paginationInfo}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(e) => setPerPage(+(e.target.value))}
          >
            {perPageOptions.map(option => (
              <option
                value={option}
                onSelect={() => setPerPage(option)}
              >
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />

      <ul>
        {paginationItems.map(item => (
          item <= total
            ? <li data-cy="item" key={item}>{`Item ${item}`}</li>
            : ''
        ))}
      </ul>
    </div>
  );
};

export default App;
