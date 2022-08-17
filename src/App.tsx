import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const perPageParam = searchParams.get('perPage');
  const perPage = perPageParam ? +perPageParam : 5;

  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? +pageParam : 1;

  const visibleItems = getNumbers(perPage * (currentPage - 1) + 1,
    Math.min(perPage * currentPage, items.length));

  const onPageChange = (page: number) => setSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
  });

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${visibleItems[0]} - ${visibleItems[visibleItems.length - 1]} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              setSearchParams({
                page: '1',
                perPage: event.target.value,
              });
            }}
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
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        getNumbers={getNumbers}
        onPageChange={onPageChange}
        visibleItems={visibleItems}
      />
    </div>
  );
};

export default App;
