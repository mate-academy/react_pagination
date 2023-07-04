import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { Select } from './components/Select';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

function itemsPerPage(perPageNum: number) {
  const newItems = [...items];
  const resultItems = [];

  for (let i = 0; i < newItems.length; i += perPageNum) {
    resultItems.push(newItems.slice(i, (i + perPageNum)));
  }

  return resultItems;
}

export const App: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState(5);

  const itemsToDisplay = itemsPerPage(perPage);
  const itemsFrom = [...itemsToDisplay[page - 1]].shift() as string;
  const itemsTo = [...itemsToDisplay[page - 1]].pop() as string;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${+itemsFrom.slice(-2)} - ${+itemsTo.slice(-2)} of ${items.length})`}
      </p>

      <Select
        selectValue={perPage}
        setOptionPage={setPerPage}
        ressetPage={setPage}
      />

      <Pagination
        currentPage={page}
        itemsToDisplay={itemsToDisplay}
        onPageChange={setPage}
      />
    </div>
  );
};

export default App;
