import React from 'react';
import './App.css';
import { useSearchParams } from 'react-router-dom';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +(searchParams.get('page') || 1);
  const itemsPerPage = +(searchParams.get('perPage') || 3);
  const startIndex = (currentPage - 1) * +itemsPerPage;
  const endIndex = startIndex + +itemsPerPage;
  const visibleItems = items.slice(startIndex, endIndex);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = event.target.value;

    if (+newPerPage !== itemsPerPage) {
      setSearchParams({ page: '1', perPage: newPerPage });
    }
  };

  const handleOnChange = (page: number) => {
    if (page !== currentPage) {
      setSearchParams({ page: `${page}`, perPage: `${itemsPerPage}` });
    }
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
            onChange={handleSelect}
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
        perPage={+itemsPerPage}
        currentPage={currentPage}
        onPageChange={handleOnChange}
      />
      <ul>
        {visibleItems.map((item, index) => (
          <li key={`${index + 1}`} data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
