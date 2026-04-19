import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { ItemList } from './components/ItemList/ItemList';
import { PageInfo } from './components/PageInfo';
import { PerPageSelector } from './components/PerPageSelector/PerPageSelector';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const startIndex = (currentPage - 1) * perPage;
  const lastIndex = Math.min(startIndex + perPage, items.length);
  const visibleItems = items.slice(startIndex, lastIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (pages: number) => {
    setPerPage(pages);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <PageInfo
        currentPage={currentPage}
        startIndex={startIndex}
        lastIndex={lastIndex}
        total={items.length}
      />

      <PerPageSelector
        perPage={perPage}
        onPerPageChange={handlePerPageChange}
      />

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <ItemList visibleItems={visibleItems} />
    </div>
  );
};

export default App;
