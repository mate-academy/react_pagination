import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { List } from './components/List';
import { Pagination } from './components/Pagination';
import { PerPageSelect } from './components/PerPageSelect';
import { getNumbers } from './utils';

const items: Item[] = getNumbers(1, 42)
  .map(n => ({ title: `Item ${n}`, id: uuidv4() }));

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const startIndex = (currentPage - 1) * perPage;
  const possibleEndIndex = startIndex + perPage;
  const endIndex = possibleEndIndex > items.length
    ? items.length
    : possibleEndIndex;

  const visibleItems = items.slice(startIndex, endIndex);

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePerPageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${endIndex} of ${items.length})`}
      </p>

      <PerPageSelect
        perPage={perPage}
        handlePerPageSelect={handlePerPageSelect}
      />

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <List items={visibleItems} />
    </div>
  );
};

export default App;
