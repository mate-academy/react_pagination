import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { NumberList } from './components/NumberList/NumberList';
import { Pagination } from './components/Pagination';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const changeItems = (selector: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(selector.target.value, 10));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const switchPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const switchNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, items.length);
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startIndex + 1} - {endIndex} of{' '}
        {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={changeItems}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <div>
        <Pagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalItems={items.length}
          onPageChange={changePage}
          onPrevPage={switchPrevPage}
          onNextPage={switchNextPage}
        />
      </div>

      <ul>
        <NumberList numbers={visibleItems} />
      </ul>
    </div>
  );
};

export default App;
