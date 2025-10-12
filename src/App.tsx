import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [item] = useState(items);

  const startIndex = (currentPage - 1) * perPage;
  const visibleItem = item.slice(startIndex, startIndex + perPage);
  const textInfo = `Page ${currentPage} (items ${startIndex + 1} - ${Math.min(startIndex + perPage, item.length)} of ${item.length})`;

  const handlerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valueStr = Number(e.target.value);

    setPerPage(valueStr);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {textInfo}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => handlerChange(e)}
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
        total={item.length} // total number of items to paginate
        perPage={perPage} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={(page: number) => setCurrentPage(page)}
      />

      <ul>
        {visibleItem.map(item1 => (
          <li key={item1} data-cy="item">
            {item1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
