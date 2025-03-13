import React, { useEffect, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useSearchParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const getPage = (
  perPage: number,
  currentPage: number,
): { start: number; end: number; length: number; pages: typeof items } => {
  const startPos = (currentPage - 1) * perPage;
  const endPos =
    startPos + perPage <= items.length ? startPos + perPage : items.length;

  return {
    start: startPos + 1,
    end: endPos,
    length: items.length,
    pages: items.slice(startPos, endPos),
  };
};

const options = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const page = getPage(perPage, currentPage);
  const [, setSearchParams] = useSearchParams();

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  useEffect(() => {
    setSearchParams({
      page: currentPage.toString(),
      perPage: perPage.toString(),
    });
  }, []);
  // searchParams.get

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {`${page.start} - ${page.end}`} of{' '}
        {page.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleSelect}
            value={perPage}
          >
            {options.map(option => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
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
        onPageChange={setCurrentPage}
      />
      <ul>
        {page.pages.map(pageItem => (
          <li data-cy="item" key={pageItem}>
            {pageItem}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
