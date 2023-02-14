import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

export const App: React.FC = () => {
  const [selectedPage, setSelectPage] = useState(1);
  const [itemsOnPage, setItemsOnPage] = useState(5);

  const [totalItems] = useState(42);
  const firstItem = (selectedPage - 1) * itemsOnPage + 1;
  const lastItem = (firstItem + itemsOnPage - 1) < totalItems
    ? (firstItem + itemsOnPage - 1)
    : totalItems;

  const onPageSelect = (page: number) => {
    setSelectPage(page);
  };

  const onItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsOnPage(+event.target.value);
    setSelectPage(1);
  };

  const itemsList = getNumbers(firstItem, lastItem)
    .map(n => `Item ${n}`);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${firstItem} - ${lastItem} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsOnPage}
            onChange={onItemsPerPage}
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
        total={totalItems}
        perPage={itemsOnPage}
        currentPage={selectedPage}
        onPageChange={onPageSelect}
      />
      <ul>
        {itemsList.map(item => <li data-cy="item" key={item}>{item}</li>)}
      </ul>
    </div>
  );
};

export default App;
