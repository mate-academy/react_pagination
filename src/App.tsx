import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

type Item = {
  id: string,
  title: string,
};

const items: Item[] = getNumbers(1, 42).map(n => {
  const value = `Item ${n}`;

  return {
    id: value,
    title: value,
  };
});

const ITEMS_PER_PAGE = [3, 5, 10, 20];

function getVisibleItems(
  allItems: Item[],
  start: number,
  end: number,
) {
  return allItems.slice(start, end + 1);
}

export const App: React.FC = () => {
  const [itemsOnPage, setitemsOnPage] = useState(5);
  const [selectedPage, setSelectedPage] = useState(1);

  const start = (selectedPage - 1) * itemsOnPage;
  const end = Math.min(start + itemsOnPage - 1, items.length - 1);

  const visibleItems = getVisibleItems(items, start, end);
  const titleInfo = `Page ${selectedPage} (items ${start + 1} - ${end + 1} of ${items.length})`;

  const handleOnPageChange = (
    newPageNumber: number,
  ) => {
    setSelectedPage(newPageNumber);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {titleInfo}
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
            {ITEMS_PER_PAGE.map(item => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={itemsOnPage}
        currentPage={selectedPage}
        onPageChange={handleOnPageChange}
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item.id}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
