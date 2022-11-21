import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils/utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const perPage = Number(searchParams.get('perPage') || '5');

  const [allItems] = useState(items);
  const pagesQuantity = Math.ceil(allItems.length / perPage);

  const fistItemInPage = +page * perPage - perPage + 1;
  const lastItemInPage = +page * perPage > allItems.length
    ? allItems.length
    : +page * perPage;

  const itemsOnCurrentPage = getNumbers(fistItemInPage, lastItemInPage);

  const handleChangeItemsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSearchParams({ perPage: event.target.value, page: '1' });
  };

  useEffect(() => {
    setSearchParams({ perPage: '5', page });
  }, []);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${fistItemInPage} - ${lastItemInPage} of ${allItems.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleChangeItemsPerPage}
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
        pagesQuantity={pagesQuantity}
        itemsOnCurrentPage={itemsOnCurrentPage}
      />
    </div>
  );
};

export default App;
