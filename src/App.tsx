import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageSelector, setPerPageSelector] = useState('5');
  const maxItem = Number(perPageSelector) * currentPage < items.length
    ? Number(perPageSelector) * currentPage
    : items.length;

  const itemsInColumn = maxItem - ((currentPage - 1) * +perPageSelector);
  const minValue = maxItem - itemsInColumn;

  const handlePage = (pageId: number) => {
    setCurrentPage(pageId);
  };

  const handlePerPage = (value: string) => {
    setPerPageSelector(value);

    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${minValue + 1} - ${maxItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPageSelector}
            onChange={(event) => handlePerPage(event.target.value)}
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
        perPage={Number(perPageSelector)}
        currentPage={currentPage}
        onPageChange={handlePage}
      />
    </div>
  );
};

export default App;
