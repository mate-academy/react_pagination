import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers, getSearchWith } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const perPageArray = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = Number(searchParams.get('perPage')) || 5;
  const currentPage = Number(searchParams.get('page')) || 1;

  const indexOfLastItem = Math.min(currentPage * perPage, items.length);
  const indexOfFirstItem = (currentPage - 1) * perPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        perPage: event.target.value || null,
        page: '1' || null,
      }),
    );
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${indexOfFirstItem + 1} - ${indexOfLastItem}) of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPage}
          >
            {perPageArray.map((selectPerPage) => (
              <option key={selectPerPage} value={selectPerPage}>
                {selectPerPage}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination total={items.length} />

      <ul>
        {currentItems.map((item) => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
