import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const total = 42;
const initialCurrentPage = 1;
const initialItemsPerPage = 5;

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const secondItem = currentPage * itemsPerPage;
  const firstItem = secondItem - itemsPerPage + 1;
  const correctedFirstItem = firstItem === 0 ? firstItem + 1 : firstItem;
  const correctedSecondItem = secondItem > total ? total : secondItem;

  const items = getNumbers(correctedFirstItem, correctedSecondItem)
    .map(n => `Item ${n}`);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(initialCurrentPage);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem} - ${correctedSecondItem} of ${total})`}
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
