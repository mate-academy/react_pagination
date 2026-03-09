import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSearchParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 5;

  const itemsStart = (currentPage - 1) * perPage + 1;
  const itemsEnd =
    currentPage * perPage > items.length ? items.length : currentPage * perPage;

  const changePage = (newPage: number) => {
    setSearchParams({
      page: String(newPage),
      perPage: String(perPage),
    });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemsStart} - ${itemsEnd} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={perPage}
            onChange={event => {
              const newPerPage = Number(event.target.value);

              setSearchParams({
                page: '1',
                perPage: String(newPerPage),
              });
            }}
            data-cy="perPageSelector"
            id="perPageSelector"
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
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => {
          changePage(page);
        }}
      />
      <ul>
        {items
          .slice((currentPage - 1) * perPage, currentPage * perPage)
          .map((item, index) => (
            <li key={index} data-cy="item">
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
