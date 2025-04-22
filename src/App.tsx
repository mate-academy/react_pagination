import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageParam = searchParams.get('page');
  const perPageParam = searchParams.get('perPage');
  const [currentPage, setCurrentPage] = useState(
    parseInt(currentPageParam || '') || 1,
  );
  const [perPage, setPerPage] = useState(parseInt(perPageParam || '') || 5);
  const totalItems = items.length;
  const firstItemOfCurrentPage = (currentPage - 1) * perPage + 1;
  const lastItemOfCurrentPage = Math.min(currentPage * perPage, totalItems);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemOfCurrentPage} - ${lastItemOfCurrentPage} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => {
              setPerPage(+e.target.value);
              setSearchParams(prev => {
                const params = new URLSearchParams(prev);

                params.set('perPage', e.target.value);
                params.set('page', '1');

                return params;
              });
              setCurrentPage(1);
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
        total={totalItems}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => {
          setSearchParams(prev => {
            const params = new URLSearchParams(prev);

            params.set('page', page.toString());

            return params;
          });
          setCurrentPage(page);
        }}
      />
      <ul>
        {getNumbers(firstItemOfCurrentPage, lastItemOfCurrentPage).map(
          value => (
            <li data-cy="item" key={value}>
              Item {value}
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default App;
