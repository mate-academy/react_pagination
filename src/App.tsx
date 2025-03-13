import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { SelectPerPage } from './components/SelectPerPage';
import { ContentItems } from './components/ContentItems';
import { Item } from './types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items: Item[] = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsFrom = itemsPerPage * (currentPage - 1) + 1;
  const itemsTo = Math.min(itemsFrom + itemsPerPage - 1, items.length);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {itemsFrom} - {itemsTo} of {items.length})
      </p>

      <SelectPerPage
        perPage={itemsPerPage}
        onSelect={value => {
          setItemsPerPage(value);
          setCurrentPage(1);
        }}
      />

      <Pagination
        total={items.length}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />

      <ContentItems
        perPage={itemsPerPage}
        currentPage={currentPage}
        items={items}
      />
    </div>
  );
};

export default App;
