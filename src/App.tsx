import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { Select } from './components/Select';
import { ItemList } from './components/ItemList';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const itemFrom = currentPage * perPage - perPage + 1;
  const itemTo = Math.min(itemFrom + perPage - 1, items.length);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {itemFrom} - {itemTo} of {items.length})
      </p>

      <Select
        perPage={perPage}
        onItemAmount={value => {
          setPerPage(value);
          setCurrentPage(1);
        }}
      />

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ItemList itemFrom={itemFrom} itemTo={itemTo} />
    </div>
  );
};

export default App;
