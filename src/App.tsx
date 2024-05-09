import React, { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from './components/Pagination';
import './App.css';
import { getNumbers } from './utils';

export const items = getNumbers(1, 42).map(n => `Item ${n}`);
const selectOptions = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = searchParams.get('page') || 1;
  const initialPerPage = searchParams.get('perPage') || selectOptions[1];

  const [perPage, setPerPage] = useState(Number(initialPerPage));
  const [currentPage, setCurrentPage] = useState(Number(initialPage));

  const firstItem = (currentPage - 1) * perPage + 1;
  const lastItem = Math.min(currentPage * perPage, items.length);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const perPageValue = Number(event.target.value);

    setPerPage(perPageValue);
    setCurrentPage(1);
    setSearchParams(search => {
      search.set('perPage', event.target.value);
      search.set('page', '1');

      return search;
    });
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams(search => {
      search.set('page', String(page));

      return search;
    });
  };

  const paginationProps = {
    perPage,
    currentPage,
    onPageChange,
    total: items.length,
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstItem} - {lastItem} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            defaultValue={perPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleSelectChange}
          >
            {selectOptions.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        // total={items.length}
        // perPage={perPage}
        // currentPage={currentPage}
        // onPageChange={onPageChange}
        {...paginationProps}
      />
    </div>
  );
};

export default App;
