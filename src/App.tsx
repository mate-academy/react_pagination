import React, { useState } from 'react';
import './App.css';
import { ItemsCountSelector } from './components/ItemsCountSelector';
import { Pagination } from './components/Pagination';
import { ItemsList } from './components/ItemsList';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const totalItemsCount = 42;
const itemsPerPageSelector: number[] = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageSelector[1]);
  const [currectPage, setCurrectPage] = useState(1);

  const fromItem: number = itemsPerPage * (currectPage - 1) + 1;
  const toItem: number = Math.min(itemsPerPage * currectPage, totalItemsCount);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currectPage} (items {fromItem} - {toItem} of {totalItemsCount})
      </p>

      <ItemsCountSelector
        itemsPerPageSelector={itemsPerPageSelector}
        itemsPerPage={itemsPerPage}
        ChangeElementsCount={(value: number): void => {
          setItemsPerPage(value);
          setCurrectPage(1);
        }}
      />

      <Pagination
        total={totalItemsCount}
        perPage={itemsPerPage}
        currectPage={currectPage}
        onPageChange={setCurrectPage}
      />

      <ItemsList
        totalItemsCount={totalItemsCount}
        itemsPerPage={itemsPerPage}
        currectPage={currectPage}
      />
    </div>
  );
};

export default App;
