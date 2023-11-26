import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsOnPage, setItemsOnPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const showedItems = currentPage * itemsOnPage;
  const firstItemOnPage = showedItems - (itemsOnPage - 1);
  const lastItemOnPage = showedItems > items.length
    ? items.length
    : showedItems;

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsOnPage(+event.target.value);
    setCurrentPage(1);
  };

  const itemsToShow = items.slice(firstItemOnPage - 1, lastItemOnPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemOnPage} - ${lastItemOnPage} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleSelectChange}
            value={itemsOnPage}
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
        perPage={itemsOnPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      {itemsToShow.map(item => (
        <li data-cy="item" key={item}>{item}</li>
      ))}
    </div>
  );
};

export default App;
