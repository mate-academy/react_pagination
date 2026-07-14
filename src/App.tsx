import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 5;

  const firstItemIndex = (currentPage - 1) * perPage;
  const lastItemIndex = firstItemIndex + perPage;

  const visibleItems = items.slice(firstItemIndex, lastItemIndex);

  const firstVisibleItem = firstItemIndex + 1;
  const lastVisibleItem = Math.min(currentPage * perPage, items.length);

  const handlePageChange = (page: number) => {
    setSearchParams({
      page: String(page),
      perPage: String(perPage),
    });
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(event.target.value);

    setSearchParams({
      page: '1',
      perPage: String(newPerPage),
    });
  };

  return (
    <div className="container">
      <h1>Items</h1>

      <p data-cy="info">
        Page {currentPage} (items {firstVisibleItem} - {lastVisibleItem} of{' '}
        {items.length})
      </p>

      <div className="field">
        <label className="label" htmlFor="perPageSelector">
          Items per page
        </label>

        <div className="control">
          <div className="select">
            <select
              id="perPageSelector"
              data-cy="perPageSelector"
              value={perPage}
              onChange={handlePerPageChange}
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>

      <ul>
        {visibleItems.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
