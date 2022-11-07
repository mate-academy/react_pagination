import React, { useState } from 'react';
import './App.css';
import { ItemsList } from './components/ItemsList/ItemsList';
import { Pagination } from './components/Pagination';
import { PerPageSelector } from './components/PerPageSelector/PerPageSelector';
import { Item } from './types/Item';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const itemsCount = 42;
const items: Item[] = getNumbers(1, itemsCount)
  .map(n => ({ title: `Item ${n}`, id: n }));

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage > itemsCount
    ? itemsCount
    : startIndex + postsPerPage;
  const visibleItems = items.slice(startIndex, endIndex);

  const handlePerPageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPostsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${endIndex} of ${itemsCount})`}
      </p>

      <PerPageSelector
        postsPerPage={postsPerPage}
        onSelect={handlePerPageSelect}
      />

      <ItemsList
        items={visibleItems}
      />

      <Pagination
        total={items.length}
        perPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default App;
