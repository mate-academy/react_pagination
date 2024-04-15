import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const itemsMax = 42;
const selectNumberOfItems = [3, 5, 10, 20];

const items = getNumbers(1, itemsMax).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPage, setNumberOfPage] = useState(5);

  const pages = getNumbers(1, Math.ceil(itemsMax / numberOfPage));

  const startIndexItem = (currentPage - 1) * numberOfPage;
  let endIndexItem = currentPage * numberOfPage;
  const visibleItems = items.slice(startIndexItem, endIndexItem);

  if (endIndexItem > itemsMax) {
    endIndexItem = itemsMax;
  }

  function handleSelectNumberOfItems(value: number) {
    setNumberOfPage(value);
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndexItem + 1} - ${endIndexItem} of ${itemsMax})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={numberOfPage}
            onChange={e => handleSelectNumberOfItems(+e.target.value)}
          >
            {selectNumberOfItems.map(item => (
              <option key={item} value={item}>
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
        pages={pages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
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
