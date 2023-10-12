import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { Items } from './components/Items/Items';
import { PageInfo } from './components/PageInfo/PageInfo';
import { PageSelector } from './components/PageSelector/PageSelector';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const firstItem = (currentPage - 1) * perPage;
  const lastItem = currentPage * perPage < items.length
    ? currentPage * perPage
    : items.length;

  const handlePageSelect = (value: number) => {
    setPerPage(value);
    setCurrentPage(1);
  };

  const preparedItems = items.slice(firstItem, lastItem);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <PageInfo
        currentPage={currentPage}
        firstItem={firstItem}
        lastItem={lastItem}
        items={items}
      />

      <PageSelector
        perPage={perPage}
        handlePageSelect={handlePageSelect}
      />

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <Items preparedItems={preparedItems} />
    </div>
  );
};
