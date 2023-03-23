import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { Items } from './components/Items';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const DEFAULT_PAGE = '1';
const DEFAULT_PER_PAGE = '5';

export const App: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams({
    page: DEFAULT_PAGE,
    perPage: DEFAULT_PER_PAGE,
  });

  const currentPage = Number(searchParams.get('page'));
  const perPage = Number(searchParams.get('perPage'));
  const total = items.length;

  const startItemIndex = (currentPage - 1) * perPage;
  const lastItemIndex = Math.min(currentPage * perPage, total);

  useEffect(() => {
    return setVisibleItems(items.slice(startItemIndex, lastItemIndex));
  }, [perPage, currentPage]);

  const onPageChange = (page: number) => {
    setSearchParams({
      page: `${page}`,
      perPage: `${perPage}`,
    });
  };

  const handlePerPageChange = (
    { target: { value } }: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSearchParams({
      page: '1',
      perPage: value,
    });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItemIndex + 1} - ${lastItemIndex} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
          >
            {[3, 5, 10, 20].map(count => (
              <option key={count} value={count}>{count}</option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <Items items={visibleItems} />
    </div>
  );
};
