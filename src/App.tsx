import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const startIndex: number = (currentPage - 1) * perPage;
  const endIndex: number = perPage + startIndex;
  const showArray: string[] = items.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${endIndex > 42 ? 42 : endIndex} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            value={perPage}
            className="form-control"
            onChange={e => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
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
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {showArray.map((item, index) => (
          <li data-cy="item" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
