import React, { useEffect, useState } from 'react';
import './App.css';
import { useSearchParams } from 'react-router-dom';
import { Items } from './components/Items';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, selectPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams({});

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    selectPerPage(+value);
    setPage(1);
  };

  const handlePageChange = (current: number) => setPage(current);

  useEffect(() => {
    searchParams.set('page', `${page}`);
    searchParams.set('perPage', `${perPage}`);
    setSearchParams(searchParams);
  }, [page, perPage]);

  const handleNextPage = () => setPage(prev => prev + 1);

  const handlePrevPage = () => setPage(prev => prev - 1);

  const indexOfLastItem = +page * perPage;
  const indexOfFirstitem = indexOfLastItem - perPage;
  const visibleItems = items.slice(indexOfFirstitem, indexOfLastItem);

  const getItem = (index: number) => visibleItems[index].split(' ')[1];

  const itemsFrom = getItem(0);
  const itemsTo = getItem(visibleItems.length - 1);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`
          Page ${page} 
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
        total={42}
        perPage={perPage}
        page={page}
        onPageChange={handlePageChange}
        onNextChange={handleNextPage}
        onPrevChange={handlePrevPage}
      />
      <Items items={visibleItems} />
    </div>
  );
};

export default App;
