import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from './components/Pagination/Pagination';

const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);

const allowedPerPageValues = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawPage = Number(searchParams.get('page')) || 1;
  const rawPerPage = Number(searchParams.get('perPage')) || 5;

  const itemsPerPage = allowedPerPageValues.includes(rawPerPage)
    ? rawPerPage
    : 5;

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentPage = rawPage >= 1 && rawPage <= totalPages ? rawPage : 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, items.length);
  const visibleItems = items.slice(startIndex, endIndex);

  const updateParams = (page: number, perPage: number) => {
    setSearchParams({
      page: String(page),
      perPage: String(perPage),
    });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${endIndex} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              updateParams(1, Number(e.target.value));
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
        currentPage={currentPage}
        total={items.length}
        perPage={itemsPerPage}
        onPageChange={(page: number) => {
          if (page !== currentPage) {
            updateParams(page, itemsPerPage);
          }
        }}
      />

      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
