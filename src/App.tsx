import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSearchParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Беремо currentPage і perPage з URL, дефолт 1 та 5
  const currentPage = Number(searchParams.get('page') ?? 1);
  const perPage = Number(searchParams.get('perPage') ?? 5);

  // Функція для зміни сторінки
  const setPage = (page: number) => {
    setSearchParams({ page: String(page), perPage: String(perPage) });
  };

  // Функція для зміни perPage (скидає сторінку на 1)
  const setPerPageValue = (value: number) => {
    setSearchParams({ page: '1', perPage: String(value) });
  };

  // Обчислюємо які елементи показувати
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, items.length);
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIndex + 1} - {endIndex} of{' '}
        {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => setPerPageValue(Number(event.target.value))}
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
        onPageChange={setPage}
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
