import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useSearchParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPage = Number(searchParams.get('perPage')) || 5;

  const total = 42;
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, total);
  const items = getNumbers(start, end).map(n => `Item ${n}`);

  const updateParams = (newPage: number, newPerPage: number) => {
    setSearchParams({ page: String(newPage), perPage: String(newPerPage) });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {start} - {end} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={e => {
              const newPerPage = Number(e.target.value);

              updateParams(1, newPerPage);
            }}
          >
            <option value="3"> 3 </option>
            <option value="5"> 5 </option>
            <option value="10"> 10 </option>
            <option value="20"> 20 </option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}

      <Pagination
        total={total}
        perPage={itemsPerPage}
        currentPage={currentPage}
        items={items}
        onPageChange={value => {
          updateParams(value, itemsPerPage);
        }}
      />
    </div>
  );
};

export default App;
