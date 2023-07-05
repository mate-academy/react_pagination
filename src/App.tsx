import React, { useState } from 'react';
import './App.css';
import { getEdgeIndexes, getNumbers, getVisibleItems } from './utils';
import { Pagination } from './components/Pagination';
import { Selector } from './components/Selector';

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
      <ul>
        {getVisibleItems(items, firstItemIndex, lastItemIndex).map(item => (
          <li data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
