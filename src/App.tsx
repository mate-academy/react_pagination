import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const lastIndexItem = currentPageNumber * perPage;
  const firstIndexItem = lastIndexItem - perPage;
  const currentPage = items.slice(firstIndexItem, lastIndexItem);

  const totalPages = Math.ceil(items.length / perPage);

  const changeSelectItemPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPageNumber(1);
  };

  return (
    <div className="container">
      <p className="lead" data-cy="info">
        {currentPageNumber} (items {currentPage[0]} -{' '}
        {currentPage[currentPage.length - 1]} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={changeSelectItemPerPage}
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
        currentPageNumber={currentPageNumber}
        setCurrentPageNumber={setCurrentPageNumber}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default App;
