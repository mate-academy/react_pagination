import React, { useEffect, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currPage, setCurrPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const splitItems = () => {
    const itemsCopy = [...items];
    const pagesWithItems = [];

    while (itemsCopy.length) {
      pagesWithItems.push(itemsCopy.splice(0, perPage));
    }

    return pagesWithItems;
  };

  const [visibleItems, setVisibleItems] = useState(splitItems()[0]);

  useEffect(() => {
    setVisibleItems(splitItems()[currPage - 1]);
  }, [perPage, currPage]);

  const firstItemIdx = items.indexOf(visibleItems[0]);
  const lastItemIdx = items.indexOf(visibleItems[visibleItems.length - 1]);

  const onPageChange = (direction: ('next' | 'prev' | null), page?: number) => {
    if (direction) {
      setCurrPage(curr => (direction === 'next' ? curr + 1 : curr - 1));

      return;
    }

    if (page) {
      setCurrPage(page);
    }
  };

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+e.target.value);
    setCurrPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currPage} (items ${firstItemIdx + 1} - ${lastItemIdx + 1} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={onSelect}
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
        perPage={perPage}
        currentPage={currPage}
        onPageChange={onPageChange}
      />

      <ul>
        {visibleItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
