import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

const perPageOptions = [3, 5, 10, 20];

function getVisibleItems(
  allItems: string[],
  currentPage: number,
  perPage: number,
): string[] {
  const start = (currentPage - 1) * perPage;
  const end = currentPage * perPage;

  return allItems.slice(start, end);
}

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get('page'));
  const perPageFromUrl = Number(searchParams.get('perPage'));

  const perPage = perPageOptions.includes(perPageFromUrl) ? perPageFromUrl : 5;

  const maxPage = Math.ceil(items.length / perPage);

  const currentPage =
    pageFromUrl >= 1 && pageFromUrl <= maxPage ? pageFromUrl : 1;

  const changePage = (page: number) => {
    setSearchParams({
      page: String(page),
      perPage: String(perPage),
    });
  };

  const changePerPage = (newPerPage: number) => {
    setSearchParams({
      page: '1',
      perPage: String(newPerPage),
    });
  };

  const visibleItems = getVisibleItems(items, currentPage, perPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {(currentPage - 1) * perPage + 1} -{' '}
        {Math.min(currentPage * perPage, items.length)} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => {
              changePerPage(Number(e.target.value));
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
        onPageChange={changePage}
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
