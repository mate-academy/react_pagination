import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPerPage = Number(searchParams.get('perPage')) || 5;
  const initialPage = Number(searchParams.get('page')) || 1;

  const [perPage, setPerPage] = useState(initialPerPage);
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    const params = {
      page: currentPage.toString(),
      perPage: perPage.toString(),
    };

    setSearchParams(params);
  }, [currentPage, perPage, setSearchParams]);

  const totalItems = items.length;
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const visibleItems = items.slice(start, end);

  function handlePageChange(newPerPage: number) {
    setCurrentPage(1);
    setPerPage(newPerPage);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${start + 1} - ${Math.min(end, totalItems)} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => handlePageChange(+event.target.value)}
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
        total={totalItems}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
