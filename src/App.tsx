import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

function getItems(itemsArr: string[], page: number, perPage: number) {
  const indStart = (page - 1) * perPage;

  return items.slice(indStart, indStart + perPage);
}

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageRaw = searchParams.get('page');
  const perPageRaw = searchParams.get('perPage');
  const page: number = pageRaw === null ? 1 : parseInt(pageRaw);
  const perPage: number = perPageRaw === null ? 3 : parseInt(perPageRaw);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page 1 (items 1 - 5 of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => {
              const newPerPage = event.target.value;

              setSearchParams({ perPage: newPerPage });
            }}
          >
            <option value="3">3 елемента</option>
            <option value="5">5 елементів</option>
            <option value="10">10 елементів</option>
            <option value="20">20 елементів</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* <Router> */}
      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={page}
        onPageChange={(nextPage: number) => {
          setSearchParams({ page: nextPage.toString() });
        }}
      />
      {/* </Router> */}

      <ul>
        {getItems(items, page, perPage).map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
