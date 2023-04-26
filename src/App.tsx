import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

export const App: React.FC = () => {
  const initialCurrentPage = 1;
  const initialItemsPerPage = 5;
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const total = 42;
  const secondItem = currentPage * itemsPerPage;
  const firstItem = secondItem - itemsPerPage + 1;
  const getCorrectedFirstItem = firstItem === 0 ? firstItem + 1 : firstItem;
  const getCorrectSecondItem = secondItem > total ? total : secondItem;

  const items = getNumbers(getCorrectedFirstItem, getCorrectSecondItem)
    .map(n => `Item ${n}`);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+e.target.value);
    setCurrentPage(initialCurrentPage);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page
        {' '}
        {currentPage}
        {' '}
        (items
        {' '}
        {firstItem}
        {' '}
        -
        {' '}
        {getCorrectSecondItem}
        {' '}
        of
        {' '}
        {total}
        )
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
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
        total={total}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <ul>
        {items.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
