import React, { useMemo, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

const ITEMS = Array.from({ length: 42 }, (_, i) => `Item ${i + 1}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const total = ITEMS.length;
  const pages = Math.max(1, Math.ceil(total / Math.max(1, perPage)));
  const page = Math.min(Math.max(1, currentPage), pages);

  const { start, end, visible } = useMemo(() => {
    const startIndex = (page - 1) * perPage;
    const endIndex = Math.min(startIndex + perPage, total);

    return {
      start: startIndex + 1,
      end: endIndex,
      visible: ITEMS.slice(startIndex, endIndex),
    };
  }, [page, perPage, total]);

  return (
    <div className="App">
      <h1>React Pagination</h1>

      <label htmlFor="perPageSelector" style={{ marginRight: 8 }}>
        Per page:
      </label>
      <select
        id="perPageSelector"
        data-cy="perPageSelector"
        value={perPage}
        onChange={e => {
          setPerPage(Number(e.target.value));
          setCurrentPage(1);
        }}
      >
        {[3, 5, 10, 20].map(n => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>

      <ul>
        {visible.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>

      <p data-cy="info">{`Page ${page} (items ${start} - ${end} of ${total})`}</p>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={page}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
