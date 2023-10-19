import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

type Item = {
  id: number,
  title: string,
};

const items = getNumbers(1, 42).map(n => `Item ${n}`);

const preparedItems: Item[] = items
  .map((item, index) => ({ id: index, title: item }));

function getVisibleItems(allItems: Item[], start: number, end: number) {
  return allItems.slice(start, end + 1);
}

export const App: React.FC = () => {
  const [itemsOnPage, setitemsOnPage] = useState(5);
  const [selectedPage, setSelectedPage] = useState(1);

  const start = (selectedPage - 1) * itemsOnPage;
  const end = Math.min(start + itemsOnPage - 1, preparedItems.length - 1);

  const visibleItems = getVisibleItems(preparedItems, start, end);

  const handleOnPageChange = (pageNumber: number) => {
    if (selectedPage !== pageNumber) {
      setSelectedPage(pageNumber);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${start + 1} - ${end + 1} of ${preparedItems.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={itemsOnPage}
            onChange={event => {
              setitemsOnPage(+event.target.value);
              handleOnPageChange(1);
            }}
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
        total={preparedItems.length}
        perPage={itemsOnPage}
        currentPage={selectedPage}
        onPageChange={handleOnPageChange}
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
