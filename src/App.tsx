import React from 'react';
import './App.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSearchParams } from 'react-router-dom';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = parseInt(searchParams.get('perPage') || '5', 10);
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const totalItemsCount = items.length;
  const perPageOptions = [3, 5, 10, 20];

  const itemsStartIndex = (currentPage - 1) * perPage;
  const itemsEndIndex = Math.min(itemsStartIndex + perPage, totalItemsCount);

  const handlePageChange = (page: number) => {
    setSearchParams({
      page: page.toString(),
      perPage: perPage.toString(),
    });
  };

  const handleSelectPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ page: '1', perPage: e.target.value });
  };

  const showPaginatedItems = () => {
    return items.slice(itemsStartIndex, itemsEndIndex).map(item => (
      <li key={item} data-cy="item">
        {item}
      </li>
    ));
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemsStartIndex + 1} - ${itemsEndIndex} of ${totalItemsCount})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleSelectPerPage}
          >
            {perPageOptions.map(n => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={totalItemsCount}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ul>{showPaginatedItems()}</ul>
    </div>
  );
};

export default App;
