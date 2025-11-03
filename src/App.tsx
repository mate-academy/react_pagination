import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { PageSelect } from './components/PageSelect';
import { useSearchParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

function getPartItems<T>(initialItems: T[], from: number, to: number): T[] {
  return [...initialItems].slice(from, to);
}

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 5;

  const updateSearchParams = (newPage: number, newPerPage: number) => {
    const params = new URLSearchParams();

    params.set('page', String(newPage));
    params.set('perPage', String(newPerPage));
    setSearchParams(params);
  };

  const handleChangePage = (newPage: number) => {
    updateSearchParams(newPage, perPage);
  };

  const handleChangePerPage = (newCurPage: number) => {
    updateSearchParams(1, newCurPage);
  };

  const firstElementIndex = (page - 1) * perPage;
  const lastElementIndex = page * perPage;

  const preparedItems = getPartItems(
    items,
    firstElementIndex,
    lastElementIndex,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {firstElementIndex + 1} -{' '}
        {Math.min(items.length, lastElementIndex)} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <PageSelect perPage={perPage} onPerPageChange={handleChangePerPage} />
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={page}
        onPageChange={handleChangePage}
      />
      <ul>
        {preparedItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
