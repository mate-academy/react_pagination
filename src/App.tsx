import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number(searchParams.get('page')) || 1;
  const perPageParams = Number(searchParams.get('perPage')) || 5;

  // додаємо 2 стани
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [perPage, setPerPage] = useState(perPageParams);

  const updateSearchParams = (page: number, perPageValue = perPage) => {
    setSearchParams({
      page: page.toString(),
      perPage: perPageValue.toString(),
    });
  };

  // ця функція буде викликана, коли користувач змінює сторінку
  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      updateSearchParams(page);
    }
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              const newPerPage = +event.target.value;

              setPerPage(newPerPage);
              setCurrentPage(1);
              updateSearchParams(1, newPerPage);
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

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIndex + 1} -{' '}
        {Math.min(endIndex, items.length)} of {items.length})
      </p>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
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
