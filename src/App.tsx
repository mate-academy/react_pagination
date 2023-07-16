import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const total = items.length;
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  function calculateEndIndex() {
    return ((currentPage - 1) * perPage) + perPage;
  }

  const startIndex: number = (currentPage - 1) * perPage;
  const endIndex: number = calculateEndIndex() <= total
    ? calculateEndIndex()
    : total;

  const setNumberPerPage = (number: number) => {
    setPerPage(number);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${endIndex} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event => setNumberPerPage(Number(event.target.value)))}
            value={perPage.toString()}
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
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {
          items.slice(startIndex, endIndex).map(item => (
            <li key={item} data-cy="item">{item}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default App;
