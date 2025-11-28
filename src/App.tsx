import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

enum PerPage {
  THREE = 3,
  FIVE = 5,
  TEN = 10,
  TWENTY = 20,
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<PerPage>(PerPage.FIVE);
  const pageSelectValues = Object.values(PerPage).filter(
    v => typeof v === 'number',
  ) as number[];

  const currentItems: string[] = items.slice(
    (currentPage - 1) * itemsPerPage,
    (currentPage - 1) * itemsPerPage + itemsPerPage,
  );

  const firstItem: number = items.length
    ? (currentPage - 1) * itemsPerPage + 1
    : 0;
  const lastItem: number = Math.min(currentPage * itemsPerPage, items.length);

  function selectItemsPerPage(value: number): void {
    if (pageSelectValues.includes(value)) {
      setItemsPerPage(value as PerPage);
      setCurrentPage(1);
    }
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${lastItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const value = Number(e.target.value);

              selectItemsPerPage(value);
            }}
          >
            {pageSelectValues.map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length} // total number of items to paginate
        perPage={itemsPerPage} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={page => setCurrentPage(page)}
      />
      <ul>
        {currentItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
