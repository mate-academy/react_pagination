import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useSearchParams } from 'react-router-dom';

const items = getNumbers(1, 42).map(n => `Item ${n}`);
const ITEMS_PER_PAGE_OPTIONS = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const rawPerPage = Number(searchParams.get('perPage')) || 5;

  const itemsPerPage = ITEMS_PER_PAGE_OPTIONS.includes(rawPerPage)
    ? rawPerPage
    : 5;

  const itemsCount = items.length;

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const perPage = Number(e.currentTarget.value);

    if (ITEMS_PER_PAGE_OPTIONS.includes(perPage)) {
      const params = new URLSearchParams(searchParams);

      params.set('perPage', String(perPage));
      params.set('page', '1');

      setSearchParams(params);
    }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(page));

    setSearchParams(params);
  };

  const itemsStartPosition = (currentPage - 1) * itemsPerPage;
  let itemsEndPosition = itemsStartPosition + itemsPerPage;

  if (itemsEndPosition > itemsCount) {
    itemsEndPosition = itemsCount;
  }

  const infoText = `Page ${currentPage} (items ${itemsStartPosition + 1} - ${itemsEndPosition} of ${itemsCount})`;
  const pageItems = items.slice(itemsStartPosition, itemsEndPosition);

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
            value={itemsPerPage}
            onChange={handlePerPageChange}
          >
            {ITEMS_PER_PAGE_OPTIONS.map(option => (
              <option key={option} value={option}>
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
        total={itemsCount}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <ul>
        {pageItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
