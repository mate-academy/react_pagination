import { FC, useEffect, useState } from 'react';
import './App.css';
import { getExtremes, getNumbers, getVisibleItems } from './utils';
import { Pagination } from './components/Pagination';
import { ItemList } from './components/ItemList';
import { PerPageSelector } from './components/PerPageSelector';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: FC = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  useEffect(() => setPage(1), [perPage]);

  const total = items.length;
  const visibleItems = getVisibleItems(items, page, perPage);
  const [firstVisible, lastVisible] = getExtremes(total, page, perPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${firstVisible} - ${lastVisible} of ${total})`}
      </p>

      <PerPageSelector perPage={perPage} onChange={setPerPage} />

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={page}
        onPageChange={setPage}
      />

      <ItemList items={visibleItems} />
    </div>
  );
};

export default App;
