import React, { useMemo } from 'react';
import './App.css';
import { useSearchParams } from 'react-router-dom';
import { Items } from './components/Items';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    perPage: '5',
  });
  const total = 42;
  const page = useMemo(() => searchParams.get('page') || '1',
    [searchParams.get('page')]);

  const perPage = useMemo(() => searchParams.get('perPage') || '5',
    [searchParams.get('perPage')]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setSearchParams({ page: '1', perPage: value });
  };

  const handlePageChange = (current: string) => {
    if (current === page) {
      return;
    }

    setSearchParams({ page: current, perPage });
  };

  const handleNextPage = () => setSearchParams({ page: `${Number(page) + 1}`, perPage });

  const handlePrevPage = () => setSearchParams({ page: `${Number(page) - 1}`, perPage });

  const indexOfLastItem = useMemo(() => +page * +perPage,
    [searchParams.get('page'), searchParams.get('perPage')]);

  const indexOfFirstitem = useMemo(() => indexOfLastItem - +perPage,
    [searchParams.get('perPage'), searchParams.get('page')]);

  const visibleItems = useMemo(() => items
    .slice(indexOfFirstitem, indexOfLastItem),
  [perPage, page]);

  const getItem = (index: number) => visibleItems[index].split(' ')[1];

  const itemsFrom = getItem(0);
  const itemsTo = getItem(visibleItems.length - 1);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} 
          (items ${itemsFrom} - ${itemsTo} of ${items.length})
        `}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleSelect}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        page={page}
        total={total}
        perPage={perPage}
        onNextChange={handleNextPage}
        onPrevChange={handlePrevPage}
        onPageChange={handlePageChange}
      />
      <Items items={visibleItems} />
    </div>
  );
};

export default App;
