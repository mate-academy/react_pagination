import React, { useState, useMemo } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

// Define items once (outside component for static data)
const allItems = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  // State for pagination (App manages this)
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;

    return allItems.slice(startIndex, startIndex + perPage);
  }, [currentPage, perPage]);

  // Handlers for Pagination callbacks
  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to page 1 after changing perPage
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      {/* Pagination component handles info and perPageSelector */}
      <Pagination
        totalItems={allItems.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />

      {/* Dynamically render only the current page's items */}
      <ul>
        {paginatedItems.map((item, index) => (
          <li key={`${item}-${index}`} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
