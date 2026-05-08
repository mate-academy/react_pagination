import { useState } from 'react';
import { Pagination } from './components/Pagination';
import { ItemList } from './components/ItemList';
import { PerPageSelector } from './components/PerPageSelector';
import { PER_PAGE_OPTIONS } from './constants/pagination';
import { getNumbers } from './utils';
import './App.css';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const itemsCount = items.length;

  const indexOfFirstItem = (currentPage - 1) * perPage;
  const indexOfLastItem = Math.min(currentPage * perPage, itemsCount);

  const startItem = itemsCount === 0 ? 0 : indexOfFirstItem + 1;

  const visibleItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageSelect = (value: number) => {
    setPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItem} - ${indexOfLastItem} of ${itemsCount})`}
      </p>

      <PerPageSelector
        value={perPage}
        options={PER_PAGE_OPTIONS}
        onChange={handlePageSelect}
      />

      <Pagination
        total={itemsCount}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ItemList items={visibleItems} />
    </div>
  );
};

export default App;
