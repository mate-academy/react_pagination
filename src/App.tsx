import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const total = items.length;

export const App: React.FC = () => {
  const [itemsOnPage, setItemsOnPage] = useState(5);
  const [selectedPage, setSelectedPage] = useState(1);

  const preparedListOfItemsOnPage: string[][] = [];

  for (let i = 0; i < total; i += itemsOnPage) {
    preparedListOfItemsOnPage.push(items.slice(i, i + itemsOnPage));
  }

  const START = selectedPage * itemsOnPage - itemsOnPage + 1;
  const END = (selectedPage - 1) * itemsOnPage
    + preparedListOfItemsOnPage[selectedPage - 1].length;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${START} - ${END} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            defaultValue="5"
            onChange={event => {
              setItemsOnPage(+event.target.value);

              if (selectedPage !== 1) {
                setSelectedPage(1);
              }
            }}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
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

      {/* Move this markup to Pagination */}
      <Pagination
        total={total}
        perPage={itemsOnPage}
        currentPage={selectedPage}
        onPageChange={setSelectedPage}
      />

      <ul>
        {preparedListOfItemsOnPage[selectedPage - 1].map(item => (
          <li data-cy="item" key="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
