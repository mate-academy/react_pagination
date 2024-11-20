import React, { useEffect, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useSearchParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPerPageSelector, setSelectedPerPageSelector] = useState('5');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    const perPage = searchParams.get('perPage') || '5';

    setCurrentPage(page);
    setSelectedPerPageSelector(perPage);
  }, [searchParams]);

  const updateURL = (page: number, perPage: string) => {
    setSearchParams({ page: String(page), perPage });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = event.target.value;

    setSelectedPerPageSelector(newPerPage);
    setCurrentPage(1);
    updateURL(1, newPerPage);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    updateURL(newPage, selectedPerPageSelector);
  };

  const from = Math.min(
    (currentPage - 1) * +selectedPerPageSelector + 1,
    items.length,
  );

  const to = Math.min(currentPage * +selectedPerPageSelector, items.length);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {from} - {to} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={selectedPerPageSelector}
            onChange={handleSelectChange}
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
        perPage={+selectedPerPageSelector}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      ></Pagination>
    </div>
  );
};

export default App;
