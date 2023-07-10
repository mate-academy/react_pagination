import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const startItem = (selectedPage - 1) * itemsPerPage;
  const endItem = startItem + itemsPerPage > items.length
    ? items.length
    : startItem + itemsPerPage;
  const visibleItems = items.slice(startItem, endItem);

  const handleItemsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
    setSelectedPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${startItem + 1} - ${endItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleItemsPerPage}
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
        perPage={itemsPerPage}
        currentPage={selectedPage}
        onPageChange={setSelectedPage}
      />
      <ul>
        {
          visibleItems.map(item => {
            return (
              <li data-cy="item">{item}</li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default App;
