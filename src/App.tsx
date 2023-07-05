import React, { useState } from 'react';
import './App.css';
import { getEdgeIndexes, getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { Selector } from './components/Selector';
import { ItemsList } from './components/ItemsList/ItemsList';

const TOTAL_PAGES = 42;
const VALUES = [3, 5, 10, 20];

const items = getNumbers(1, TOTAL_PAGES)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const [firstItemIndex, lastItemIndex] = getEdgeIndexes(
    TOTAL_PAGES,
    currentPage,
    perPage,
  );

  const perPageHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemIndex + 1} - ${lastItemIndex + 1} of 42)`}
      </p>

      <Selector
        values={VALUES}
        perPage={perPage}
        onPerPageChange={perPageHandle}
      />

      {/* Move this markup to Pagination */}
      <Pagination
        total={TOTAL_PAGES}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ItemsList
        items={items}
        firstElementIndex={firstItemIndex}
        lastElementIndex={lastItemIndex}
      />
    </div>
  );
};

export default App;
