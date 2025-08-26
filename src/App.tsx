import React, { useState } from 'react';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const total = items.length;
  const pagedItems = items.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onChange={setCurrentPage}
        onPerPageChange={p => {
          setPerPage(p);
          setCurrentPage(1);
        }}
      />

      <ul>
        {pagedItems.map((item, idx) => (
          <li key={idx} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
