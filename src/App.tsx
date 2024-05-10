import React, { ChangeEvent, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from './components/Pagination';
import './App.css';
import { getNumbers } from './utils';

export const items = getNumbers(1, 42).map(n => `Item ${n}`);
const selectOptions = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = searchParams.get('page');
  const initialPerPage = searchParams.get('perPage');

  // Validate initialPage and initialPerPage to ensure they are valid numbers
  const validatedInitialPage =
    initialPage && !isNaN(Number(initialPage)) && Number(initialPage) > 0
      ? Number(initialPage)
      : 1;
  const validatedInitialPerPage =
    initialPerPage &&
    selectOptions.includes(Number(initialPerPage)) &&
    Number(initialPerPage) > 0
      ? Number(initialPerPage)
      : selectOptions[1];

  const [perPage, setPerPage] = useState(validatedInitialPerPage);
  const [currentPage, setCurrentPage] = useState(validatedInitialPage);

  useEffect(() => {
    // Update search params when perPage or currentPage changes
    setSearchParams(search => {
      search.set('perPage', String(perPage));
      search.set('page', String(currentPage));

      return search;
    });
  }, [perPage, currentPage, setSearchParams]);

  const firstItem = (currentPage - 1) * perPage + 1;
  const lastItem = Math.min(currentPage * perPage, items.length);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const perPageValue = Number(event.target.value);

    if (perPageValue > 0) {
      setPerPage(perPageValue);
      setCurrentPage(1);
    }
  };

  const onPageChange = (page: number) => {
    if (page > 0) {
      setCurrentPage(page);
    }
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
