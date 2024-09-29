import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { ItemList } from './components/ItemsList';
import { Option } from './components/Option';

export const items = getNumbers(1, 42).map(n => `Item ${n}`);
export const options = [3, 5, 10, 20, 40];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePages = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {`${currentPage}`} (items{' '}
        {`${currentPage * perPage - perPage + 1} - ${currentPage * perPage > items.length ? items.length : currentPage * perPage}`}{' '}
        of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleChangePages}
            value={perPage}
          >
            {options.map((option, index) => {
              return <Option option={option} key={index} />;
            })}
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
        setCurrentPage={setCurrentPage}
      />

      <ItemList
        items={items.slice(
          (currentPage - 1) * perPage,
          (currentPage - 1) * perPage + perPage,
        )}
      />
    </div>
  );
};

export default App;
