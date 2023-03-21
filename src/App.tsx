import React, { useState } from 'react';
import './App.css';
import { PageInfo } from './components/PageInfo';
import { Pagination } from './components/Pagination';
import { PerPageSelector } from './components/PerPageSelector';
import { ItemsCount } from './types/ItemsCount';
import { getRangeOfItems } from './utils/helper';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const total = 42;

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ItemsCount.Five);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePerPageChange = (numberOfItems: number) => {
    setItemsPerPage(numberOfItems);
    setCurrentPage(1);
  };

  const [firstItem, lastItem]
    = getRangeOfItems(total, currentPage, itemsPerPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <PageInfo
        currentPage={currentPage}
        firstItem={firstItem}
        lastItem={lastItem}
        total={total}
      />

      <PerPageSelector
        currentAmountOfItems={itemsPerPage}
        onPerPageChange={handlePerPageChange}
      />

      <Pagination
        total={total}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
