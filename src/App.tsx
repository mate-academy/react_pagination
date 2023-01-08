import type { FC } from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { ItemList } from './components/ItemList';
import { Selector } from './components/Selector';
import { Info } from './components/Info';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const pageChange = (action: number | string) => {
    switch (action) {
      case 'next':
        setCurrentPage((prev) => prev + 1);
        break;
      case 'prev':
        setCurrentPage((prev) => prev - 1);
        break;
      default:
        setCurrentPage(Number(action));
    }
  };

  const pageCount = Math.ceil(items.length / perPage);

  const firstItem = (currentPage - 1) * perPage + 1;
  const lastItem = Math.min(currentPage * perPage, items.length);

  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(1);
    }
  }, [perPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <Info
        currentPage={currentPage}
        firstItem={firstItem}
        lastItem={lastItem}
        length={items.length}
      />

      <Selector perPage={perPage} setPerPage={setPerPage} />

      <Pagination
        currentPage={currentPage}
        onPageChange={pageChange}
        pages={pageCount}
      />

      <ItemList
        items={items}
        currentPage={currentPage}
        perPage={perPage}
      />
    </div>
  );
};
