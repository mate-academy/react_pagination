import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSearchParams } from 'react-router-dom';

enum PerPageOptions {
  Three = 3,
  Five = 5,
  Ten = 10,
  Twenty = 20,
}

const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(
    searchParams.get('perPage') || String(PerPageOptions.Five),
    10,
  ) as PerPageOptions;

  const totalItems = items.length;
  const itemsStart = perPage * currentPage - perPage;
  const itemsEnd = Math.min(perPage * currentPage, totalItems);

  const preparedItems = items.slice(itemsStart, itemsEnd);

  function handlePerPageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue = Number(e.target.value) as PerPageOptions;

    setSearchParams({
      page: '1',
      perPage: String(selectedValue),
    });
  }

  function handlePageChange(page: number) {
    setSearchParams({
      page: String(page),
      perPage: String(perPage),
    });
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {itemsStart + 1} - {itemsEnd} of {totalItems})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePerPageChange}
            value={perPage}
          >
            {Object.values(PerPageOptions)
              .filter(value => typeof value === 'number')
              .map(value => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        items={preparedItems}
        total={totalItems}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
