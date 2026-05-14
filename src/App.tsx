import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const TOTAL_ITEMS = 42;
const DEFAULT_PER_PAGE = 5;
const FIRST_PAGE = 1;

const items = getNumbers(1, TOTAL_ITEMS).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<number>(DEFAULT_PER_PAGE);
  const [currentPage, setCurrentPage] = useState<number>(FIRST_PAGE);

  const fromIndex = (currentPage - 1) * perPage;
  const fromItem = fromIndex + 1;
  const toItem = Math.min(fromIndex + perPage, TOTAL_ITEMS);
  const pageInfo = `Page ${currentPage} (items ${fromItem} - ${toItem} of ${TOTAL_ITEMS})`;
  const selectedItems = items.slice(fromIndex, toItem);

  function handlePageChange(page: number) {
    if (currentPage !== page) {
      setCurrentPage(page);
    }
  }

  function handleSelectChange(count: number) {
    setPerPage(count);
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {pageInfo}
      </p>

      <Pagination
        total={TOTAL_ITEMS}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onSelectChange={handleSelectChange}
      />

      <ul>
        {selectedItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
