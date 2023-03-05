import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const total = 42;
  const numberOfItems = ['3', '5', '10', '20'];

  const [selectedItems, setSelectedItems] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const startItems = 1 + (currentPage - 1) * selectedItems;
  const endItems = currentPage * selectedItems > total
    ? total
    : currentPage * selectedItems;

  const visibleItems = [...items];
  const getVisibleItems = () => visibleItems.slice(startItems - 1, endItems);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItems(+event.target.value);
    setCurrentPage(1);
  };

  const handleChangePage = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startItems} - ${endItems} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={selectedItems}
            onChange={handleSelectChange}
          >
            {numberOfItems.map((selectedItem: string) => (
              <option
                value={selectedItem}
                key={selectedItem}
              >
                {selectedItem}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={selectedItems}
        currentPage={currentPage}
        onPageChange={handleChangePage}
      />

      <ul>
        {getVisibleItems().map(item => (
          <li
            key={item}
            data-cy="item"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
