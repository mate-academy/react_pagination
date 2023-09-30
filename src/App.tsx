import React, { useState } from 'react';

import { getNumbers } from './utils';
import { MainInfo } from './components/MainInfo';
import { FormGroup } from './components/FormGroup';
import { Pagination } from './components/Pagination';
import { ItemsList } from './components/ItemsList';

import './App.css';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const DEFAULT_VALUE = 5;
const totalItems = items.length;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(DEFAULT_VALUE);
  const [currentPage, setCurrentPage] = useState(1);

  const itemStart: number = perPage * currentPage - perPage;
  const itemEnd: number = Math.min(itemStart + perPage, totalItems);
  const visibleItem = items.slice(itemStart, itemEnd);

  const handlerPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <MainInfo
        currentPage={currentPage}
        itemStart={itemStart}
        itemEnd={itemEnd}
        totalItems={totalItems}
      />

      <FormGroup
        perPage={perPage}
        handlerPerPage={handlerPerPage}
      />

      <Pagination
        total={totalItems}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <ItemsList items={visibleItem} />
    </div>
  );
};

export default App;
