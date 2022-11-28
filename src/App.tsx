import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [select, setSelect] = useState('5');
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * +select;
  const indexOfFirstItem = indexOfLastItem - +select;
  const currentItem = items.slice(indexOfFirstItem, indexOfLastItem);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setSelect(event.target.value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page 1 (items ${indexOfFirstItem + 1} - ${indexOfLastItem > 42 ? 42 : indexOfLastItem} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={select}
            onChange={handleChange}
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
        total={currentItem}
        perPage={+select}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

    </div>
  );
};

export default App;
