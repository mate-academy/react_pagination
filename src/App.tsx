import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { PerPageSelector } from './components/PerPageSelector';
import { ItemsCount } from './types/ItemsCount';
import { getRangeOfItems, createInfo } from './utils/helper';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ItemsCount.Five);
  const [total] = useState(42);

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

      <p className="lead" data-cy="info">
        {createInfo(currentPage, firstItem, lastItem, total)}
      </p>

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
