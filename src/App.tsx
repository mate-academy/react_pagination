import React, { useEffect, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);
const optionValue = [3, 5, 10, 20];

function visibleItems(
  getItems: string[],
  perPage: number,
  currentPage: number,
): string[] {
  const firstElement = perPage * (currentPage - 1);
  const lastElement = firstElement + perPage;

  return getItems.slice(firstElement, lastElement);
}

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePage, setVisiblePage] = useState<string[]>([]);

  const total = items.length;
  const firstItem = perPage * (currentPage - 1) + 1;

  useEffect(() => {
    setVisiblePage(visibleItems(items, perPage, currentPage));
  }, [items, perPage, currentPage]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {firstItem} - {firstItem + visiblePage.length - 1} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleChange}
          >
            {optionValue.map((el: number) => {
              return (
                <option key={el} value={`${el}`}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page: number) => {
          setCurrentPage(page);
        }}
      />
      <ul>
        {visiblePage.map((el: string) => {
          return (
            <li data-cy="item" key={el}>
              {el}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
