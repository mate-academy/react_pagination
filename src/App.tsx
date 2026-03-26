import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { Selector } from './components/Selector';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const steps = [3, 5, 10, 20];

const toPositiveInt = (value: string | null) => {
  const num = Number(value);

  if (!Number.isFinite(num) || num <= 0) {
    return null;
  }

  return Math.trunc(num);
};

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPerPage = toPositiveInt(searchParams.get('perPage')) ?? 5;
  const initialCurrentPage = toPositiveInt(searchParams.get('page')) ?? 1;

  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [perPage, setPerPage] = useState(initialPerPage);
  const itemsToShow = items.slice(
    perPage * currentPage - perPage,
    perPage * currentPage,
  );
  const startItemIndex =
    items.length === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endItemIndex = Math.min(currentPage * perPage, items.length);

  const handlePerPageSelector = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const nextPerPage = Number(event.target.value);

    setPerPage(nextPerPage);
    setCurrentPage(1);

    const next = new URLSearchParams(searchParams);

    next.set('perPage', String(nextPerPage));
    next.set('page', '1');
    setSearchParams(next);
  };

  const handleSetCurrentPage = (page: number) => {
    setCurrentPage(page);

    const next = new URLSearchParams(searchParams);

    next.set('page', String(page));
    setSearchParams(next);
  };

  useEffect(() => {
    const pageFromUrl = toPositiveInt(searchParams.get('page'));
    const perPageFromUrl = toPositiveInt(searchParams.get('perPage'));

    if (pageFromUrl !== null) {
      setCurrentPage(pageFromUrl);
    }

    if (perPageFromUrl !== null) {
      setPerPage(perPageFromUrl);
    }
  }, [searchParams]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startItemIndex} - {endItemIndex} of{' '}
        {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <Selector
            options={steps}
            value={perPage}
            onChange={handlePerPageSelector}
          />
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handleSetCurrentPage}
      />
      <ul>
        {itemsToShow.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
