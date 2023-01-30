import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const visibleItems = perPage * currentPage;
  const startItemsCount = ((currentPage - 1) * perPage) + 1;
  const endItemsCount = !(visibleItems > items.length)
    ? visibleItems
    : items.length;

  const handlePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const { textContent } = event.currentTarget;

    if (textContent) {
      switch (textContent) {
        case '«':
          if (currentPage === 1) {
            return;
          }

          setCurrentPage(currentPage - 1);
          break;

        case '»':
          if (currentPage === Math.ceil(items.length / perPage)) {
            return;
          }

          setCurrentPage(currentPage + 1);
          break;

        default:
          setCurrentPage(+textContent);
          break;
      }
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItemsCount} - ${endItemsCount} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPage}
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
        total={items}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
