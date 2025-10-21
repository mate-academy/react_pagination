import React, { useState, useMemo } from 'react';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const total = 42;
const allItems = getNumbers(1, total);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * perPage;

    return allItems.slice(start, start + perPage);
  }, [perPage, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (value: number) => {
    setPerPage(value);
    setCurrentPage(1); // reset to page 1
  };

  return (
    <div className="App">
      <ul data-cy="itemsList">
        {currentItems.map(item => (
          <li key={item} data-cy="item">
            Item {item}
          </li>
        ))}
      </ul>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />
    </div>
  );
};

export default App;
