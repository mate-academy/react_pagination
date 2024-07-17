import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { Items } from './components/Items';
import { Page } from './types/page';

const pagePropertiesDefault: Page = {
  total: 42,
  perPage: 5,
  currentPage: 1,
};

export const App: React.FC = () => {
  const [pageProperties, setPageProperties] = useState<Page>(
    pagePropertiesDefault,
  );
  const { total, perPage, currentPage } = pageProperties;
  const frtItem = 1 + (currentPage - 1) * perPage;
  const lastItem = currentPage * perPage;

  const handleClickPageChange = (callback: (prev: Page) => Page) => {
    setPageProperties(callback);
  };

  const handleSelectItemsPerPage = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = e.target;

    setPageProperties(prev => ({
      ...prev,
      perPage: parseInt(value, 10),
      currentPage: 1,
      start: 1,
      end: parseInt(value, 10),
    }));
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {frtItem} -{' '}
        {lastItem > total ? total : lastItem} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleSelectItemsPerPage}
          >
            <option value="3">3</option>
            <option value="5" selected>
              5
            </option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handleClickPageChange}
      />
      <Items frtItem={frtItem} lastItem={lastItem} total={total} />
    </div>
  );
};

export default App;
