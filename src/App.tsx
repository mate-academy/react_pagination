import React, { useState } from 'react';

import './App.css';
import { getNumbers } from './utils';
import { Pagination, PerPageSelector, ItemList } from './components';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  const firstDisplayedItem = perPage * currentPage - perPage;
  const lastDisplayedItem = perPage * currentPage > items.length
    ? items.length - 1
    : perPage * currentPage - 1;

  const itemsToDisplay = items.slice(
    firstDisplayedItem,
    lastDisplayedItem + 1,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstDisplayedItem + 1} - ${lastDisplayedItem + 1} of ${items.length})`}
      </p>

      <PerPageSelector
        onPerPageChange={handlePerPageChange}
        currentPerPage={perPage}
      />

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageSelect}
      />

      <ItemList items={itemsToDisplay} />
    </div>
  );
};

export default App;
