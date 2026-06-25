import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { useSearchParams } from 'react-router-dom';
import Pagination from './components/Pagination/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 5;

  const total = items.length;

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  const visibleItems = items.slice(startIndex, endIndex);

  const updateParams = (page: number, perPageValue: number) => {
    setSearchParams({
      page: String(page),
      perPage: String(perPageValue),
    });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {total === 0 ? 0 : startIndex + 1} -{' '}
        {Math.min(endIndex, total)} of {total})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={e => updateParams(1, Number(e.target.value))}
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
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={page => updateParams(page, perPage)}
      />

      <ul>
        {visibleItems.map((item, i) => (
          <li key={i} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
