import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  // const [perPage, setPerPage] = useState(5);
  // const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 5;

  const onPageChange = (page: number) => {
    setSearchParams({
      page: String(page),
      perPage: String(perPage),
    });
  };

  const onPerPageChange = (value: number) => {
    setSearchParams({
      page: '1',
      perPage: String(value),
    });
  };

  const start = (currentPage - 1) * perPage;
  const visibleItems = items.slice(start, start + perPage);

  const totalItems = items.length;
  const firstItemPage = totalItems === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const lastItemPage = Math.min(currentPage * perPage, totalItems);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemPage} - ${lastItemPage} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => onPerPageChange(Number(event.target.value))}
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
        // onPageChange={(page: number) => setCurrentPage(page)}
        onPageChange={onPageChange}
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
