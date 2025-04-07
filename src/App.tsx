import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

const perItemForPage = [
  { value: 3, lable: '3' },
  { value: 5, lable: '5' },
  { value: 10, lable: '10' },
  { value: 20, lable: '20' },
];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<number>(perItemForPage[1].value);
  const [currentPage, setCurrentPage] = useState(1);
  const total = items.length;

  const lastItemIndex = currentPage * perPage;
  const firstIndex = lastItemIndex - perPage;
  const currentSlice = items.slice(firstIndex, lastItemIndex);

  const handlePerPege = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const handlePage = (page: number) => {
    setCurrentPage(page);
  };

  const from = firstIndex + 1;
  const to = Math.min(lastItemIndex, total);

  const message = `Page ${currentPage} (items ${from} - ${to} of 42)`;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {message}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPege}
          >
            {perItemForPage.map(item => (
              <option key={item.value} value={item.value}>
                {item.lable}
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
        onPageChange={handlePage}
      />

      <ul>
        {currentSlice.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
