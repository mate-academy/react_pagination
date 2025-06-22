import React from 'react';

import './App.css';

import { getNumbers, getPageItems, usePaginationParams } from './utils';
import { Info } from './components/Info';
import { PageItems } from './components/PageItems';
import { Pagination } from './components/Pagination';
import { PerPageSelector } from './components/PerPageSelector';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const {
    perPage,
    pageNumber,
    maxPagesCount,
    setPerPage,
    setPageNumber,
    setMaxPagesCount,
  } = usePaginationParams(items.length);

  const paginatedItems = getPageItems(items, { perPage, pageNumber });

  return (
    <div className="container">
      <h1>Items with Pagination</h1>
      <Info itemsList={items} perPage={perPage} pageNumber={pageNumber} />
      <PerPageSelector
        itemsList={items}
        perPage={perPage}
        setPerPage={setPerPage}
        setMaxPagesCount={setMaxPagesCount}
        setPageNumber={setPageNumber}
      />
      <Pagination
        pageNumber={pageNumber}
        maxPagesCount={maxPagesCount}
        onClick={setPageNumber}
      />
      <PageItems itemsList={paginatedItems} />
    </div>
  );
};

export default App;
