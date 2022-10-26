import React, { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => ({
    name: `Item ${n}`,
    id: uuidv4(),
    number: n,
  }));

const options = [3, 5, 10, 20];
const optioinsWithId = options.map(option => ({
  name: option,
  id: uuidv4(),
}));

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const fromItem = itemsPerPage * currentPage - (itemsPerPage - 1);
  const toItem = (itemsPerPage * currentPage < 42)
    ? (itemsPerPage * currentPage)
    : 42;
  const visibleItems = items.slice(fromItem - 1, toItem);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  const handlePageGhange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${fromItem} - ${toItem} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleSelectChange}
          >
            {optioinsWithId.map(option => (
              <option value={option.name} key={option.id}>{option.name}</option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={42}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageGhange}
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item.id}>{`Item ${item.number}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
