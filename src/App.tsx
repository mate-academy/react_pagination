import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

function getPreparedItems(
  itemsArr: string[],
  itemsOnPage: number,
  page: number,
) {
  let preparedItems = [...itemsArr];
  const firstItem = (page - 1) * itemsOnPage;
  let lastItem = page * itemsOnPage;

  if (lastItem > itemsArr.length) {
    lastItem = itemsArr.length;
  }

  if (itemsOnPage) {
    preparedItems = preparedItems.slice(firstItem, lastItem);
  }

  return { preparedItems, firstItem, lastItem };
}

export const App: React.FC = () => {
  const [itemsOnPage, setItemsOnPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const { preparedItems, firstItem, lastItem } = getPreparedItems(
    items,
    itemsOnPage,
    currentPage,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItem + 1} - ${lastItem} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsOnPage}
            onChange={event => [
              setItemsOnPage(Number(event.target.value)),
              setCurrentPage(1),
            ]}
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
        currentPage={currentPage}
        onChangePage={setCurrentPage}
        itemsOnPage={itemsOnPage}
        totalItems={items.length}
      />

      <ul>
        {preparedItems.map(item => (
          <li data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
