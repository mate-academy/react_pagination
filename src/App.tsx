import React, { useMemo } from 'react';
import './App.css';
import { useSearchParams } from 'react-router-dom';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const itemsPerPage = Number(searchParams.get('perPage')) || 5;
  const startIndex = useMemo(() => itemsPerPage * (page - 1) + 1,
    [itemsPerPage, page]);
  const endIndex = useMemo(() => (itemsPerPage * page > items.length
    ? items.length
    : itemsPerPage * page), [itemsPerPage, page]);
  const visibleItems = useMemo(() => items.slice(startIndex - 1, endIndex),
    [items, startIndex, endIndex]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        { `Page ${page} (items ${startIndex} - ${endIndex} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            value={itemsPerPage}
            onChange={(e) => {
              searchParams.set('page', '1');
              searchParams.set('perPage', e.target.value);
              setSearchParams(searchParams);
            }}
            className="form-control"
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
        perPage={itemsPerPage}
        currentPage={page}
      />
      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
