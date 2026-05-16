import React, { useEffect, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);

    return Number(params.get('page')) || 1;
  });

  const [perPage, setPerPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);

    return Number(params.get('perPage')) || 5;
  });

  const total = items.length;

  useEffect(() => {
    const params = new URLSearchParams();

    params.set('page', String(currentPage));
    params.set('perPage', String(perPage));

    const newUrl = `${window.location.pathname}?${params.toString()}`;

    window.history.pushState({}, '', newUrl);
  }, [currentPage, perPage]);

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const startItemIdex = total === 0 ? 0 : indexOfFirstItem + 1;
  const endItemIndex = Math.min(indexOfLastItem, total);

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startItemIdex} - {endItemIndex} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
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
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      />

      <ul>
        {currentItems.map((item, index) => (
          <li key={index} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
