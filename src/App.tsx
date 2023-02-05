import React from 'react';
import './App.css';
import { useSearchParams } from 'react-router-dom';
import { getExtremes, getNumbers, getVisibleItems } from './utils';
import { Pagination } from './components/Pagination';
import { ItemList } from './components/ItemList';
import { PerPageSelector } from './components/PerPageSelector';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get('page') || 1);
  const perPage = +(searchParams.get('perPage') || 5);

  const setPage = (newPage: number) => {
    searchParams.set('page', `${newPage}`);
    setSearchParams(searchParams);
  };

  const setPerPage = (newPerPage: number) => {
    setSearchParams({
      page: '1',
      perPage: `${newPerPage}`,
    });
  };

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
