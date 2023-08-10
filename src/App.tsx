import React, { useState } from 'react';
import './App.css';
import { getNumbers, getPages } from './utils';
import { Table } from './components/Table/Table';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export function getItems(page: number, limit: number): string[] {
  const visibleItems = [];

  for (let i = (page - 1) * limit; i < (page * limit); i += 1) {
    visibleItems.push(items[i]);
  }

  return visibleItems;
}

export function getLength() {
  return items.length;
}

export const App: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);

  const totalPage = Math.ceil(getLength() / limit);

  const pages = getPages(1, totalPage)
    .map(n => `${n}`);

  return (
    <div className="container">
      <Table
        view={() => getItems(page, limit)}
        items={items}
        pages={pages}
        pageCur={page}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
      />
    </div>
  );
};

export default App;
