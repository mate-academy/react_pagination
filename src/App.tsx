import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 5;

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleItems = items.slice(startIndex, endIndex);

  const itemFrom = startIndex + 1;
  const itemTo = Math.min(items.length, endIndex);

  const updateParams = (params: { page?: string; perPage?: string }) => {
    const newParams = new URLSearchParams(searchParams);

    if (params.page) {
      newParams.set('page', params.page);
    }

    if (params.perPage) {
      newParams.set('perPage', params.perPage);
    }

    setSearchParams(newParams);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateParams({
      perPage: event.target.value,
      page: '1',
    });
  };

  const handlePageChange = (page: number) => {
    updateParams({ page: page.toString() });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemFrom} - ${itemTo} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handlePerPageChange}
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
        onPageChange={handlePageChange}
      />

      <ul className="list-group mt-3">
        {visibleItems.map(item => (
          <li data-cy="item" key={item} className="list-group-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
