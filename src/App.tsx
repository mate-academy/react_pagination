import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const total = items.length;

  const totalPages = Math.ceil(total / perPage);

  const safePage = Math.min(
    Math.max(page, 1),
    totalPages === 0 ? 1 : totalPages,
  );

  const startIndex = total === 0 ? 0 : (safePage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      {/* Move this markup to Pagination */}
      <Pagination
        total={total}
        perPage={perPage}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onPerPageChange={(newPerPage: number) => {
          setPerPage(newPerPage);
          setPage(1);
        }}
      />

      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
