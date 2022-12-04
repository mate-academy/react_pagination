import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const total = items.length;

const options = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerpage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const from = (currentPage - 1) * perPage;
  const to = currentPage * perPage > total
    ? total
    : currentPage * perPage;
  const itemsCount = items.slice(from, to);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${from + 1} - ${to} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              setPerpage(+event.target.value);
              setCurrentPage(1);
            }}
          >
            {options.map(option => (
              <option
                value={option}
                key={option}
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
        total={total} // total number of items to paginate
        perPage={perPage} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={setCurrentPage}
      />

      <ul>
        {itemsCount.map(item => (<li key={item} data-cy="item">{`${item}`}</li>))}

      </ul>
    </div>
  );
};

export default App;
