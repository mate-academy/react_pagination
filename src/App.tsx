import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 5;

  const totalItems = items.length;

  const updateParams = (newPage: number, newPerPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', newPage.toString());
    params.set('perPage', newPerPage.toString());
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    updateParams(page, perPage);
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(event.target.value);

    updateParams(1, newPerPage);
  };

  const startItemIndex = (currentPage - 1) * perPage;
  const endItemIndex = Math.min(startItemIndex + perPage, totalItems);
  const visibleItems = items.slice(startItemIndex, endItemIndex);

  const infoText =
    totalItems > 0
      ? `Page ${currentPage} (items ${startItemIndex + 1} - ${endItemIndex} of ${totalItems})`
      : `Page 1 (items 0 - 0 of 0)`;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {infoText}
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
        total={totalItems}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
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
