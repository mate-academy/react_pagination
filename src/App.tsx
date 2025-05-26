import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

export function getAvailablePages(
  itemsList: string[],
  itemsPerPage: number,
): number[] {
  const pages: number[] = [];
  let itemsLeft = itemsList.length;
  let pageCount = 0;

  while (itemsLeft > 0) {
    itemsLeft -= itemsPerPage;
    pageCount++;
    pages.push(pageCount);
  }

  return pages;
}

function prepareVisibleItems(
  items: string[],
  { currentPage, itemsPerPage }: { currentPage: number; itemsPerPage: number },
): string[] {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return items.slice(start, end);
}

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);
  const availablePages = getAvailablePages(items, itemsPerPage);
  const visibleItems: string[] = prepareVisibleItems(items, {
    currentPage,
    itemsPerPage,
  });

  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === availablePages.length;

  const firstItem = (currentPage - 1) * itemsPerPage + 1;
  const lastItem = Math.min(firstItem + itemsPerPage - 1, items.length);

  const handlePrevPage = () => {
    if (isCurrentPageFirst) {
      return;
    }

    setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (isCurrentPageLast) {
      return;
    }

    setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={element => {
              setItemsPerPage(Number(element.target.value));
              setCurrentPage(1);
            }}
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
        currentPage={currentPage}
        availablePages={availablePages}
        isFirstPage={isCurrentPageFirst}
        isLastPage={isCurrentPageLast}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onSelectPage={setCurrentPage}
      />

      <ul>
        {visibleItems.map(item => {
          return (
            <li key={item} data-cy="item">
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
