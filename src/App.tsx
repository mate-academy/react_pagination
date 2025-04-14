import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

function getStartEndIndex(
  currentPage: number,
  itemsPerPage: number,
): [number, number] {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex =
    startIndex + itemsPerPage - 1 < items.length
      ? startIndex + itemsPerPage - 1
      : items.length - 1;

  return [startIndex, endIndex];
}

function getVisibleItems(currentPage: number, itemsPerPage: number): string[] {
  const indexes = getStartEndIndex(currentPage, itemsPerPage);

  const startIndex = indexes[0];
  const endIndex = indexes[1];

  const result: string[] = [];

  for (let i = startIndex; i <= endIndex; i++) {
    result.push(items[i]);
  }

  return result;
}

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const visibleItems = getVisibleItems(currentPage, itemsPerPage);
  const indexes = getStartEndIndex(currentPage, itemsPerPage);

  function onPageChange(page: number) {
    setCurrentPage(page);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${indexes[0] + 1} - ${indexes[1] + 1} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => {
              setCurrentPage(1);
              setItemsPerPage(parseInt(event.target.value));
            }}
          >
            <option value={3}>3</option>
            <option value={5} selected>
              5
            </option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
