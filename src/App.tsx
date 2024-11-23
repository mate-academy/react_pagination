import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 12).map(n => `Item ${n}`);

function paginateArray(arr: string[], pageSize: number) {
  const pages = [];

  for (let i = 0; i < arr.length; i += pageSize) {
    pages.push(arr.slice(i, i + pageSize));
  }

  return pages;
}

export const App: React.FC = () => {
  const [selected, setSelected] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const numberOfPages: number = paginateArray(items, selected).length;
  const pages: string[][] = paginateArray(items, selected);
  const total: number = items.length;
  const firstItem = pages[currentPage - 1][0].split(' ')[1];
  const lastItem =
    pages[currentPage - 1][pages[currentPage - 1].length - 1].split(' ')[1];

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelected(+e.target.value);
    setCurrentPage(1);
  }

  function onPageChange(page: number): void {
    if (page <= numberOfPages && page >= 1) {
      setCurrentPage(page);
    } else {
      return;
    }
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} ({`items ${firstItem} - ${lastItem}`} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={selected}
            onChange={handleSelect}
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

      {/* Move this markup to Pagination */}
      <Pagination
        currentPage={currentPage}
        pages={pages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default App;
