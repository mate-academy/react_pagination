import React, { useEffect, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPer, setItemsPer] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const [
    visibleItems, setVisibleItems,
  ] = useState<string[]>([]);

  useEffect(() => {
    const firstItem = itemsPer * (activePage - 1);
    const nextPageItem = firstItem + itemsPer;

    setVisibleItems(items.slice(firstItem, nextPageItem));
  }, [itemsPer, activePage]);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPer(+event.target.value);
    setActivePage(1);
  };

  const handlePageChange = (page: number) => {
    setActivePage(page);
  };

  const firstVisibleIndex = items.indexOf(visibleItems[0]) + 1;
  const lastVisibleIndex = items
    .indexOf(visibleItems[visibleItems.length - 1]) + 1;

  return (
    <>
      <div className="container">
        <h1>Items with Pagination</h1>

        <p className="lead" data-cy="info">
          {`Page ${activePage} (items ${firstVisibleIndex} - ${lastVisibleIndex} of ${items.length})`}
        </p>

        <div className="form-group row">
          <div className="col-3 col-sm-2 col-xl-1">
            <select
              data-cy="perPageSelector"
              id="perPageSelector"
              className="form-control"
              value={itemsPer}
              onChange={handleSelect}
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
          perPage={itemsPer}
          currentPage={activePage}
          onPageChange={handlePageChange}
        />
        <ul>
          {visibleItems.map(item => <li data-cy="item" key={item}>{item}</li>)}
        </ul>
      </div>

    </>
  );
};

export default App;
