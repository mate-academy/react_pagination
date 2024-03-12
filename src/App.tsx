import React, { useState } from 'react';
import './App.css';
import { utils } from './utils';
import { Pagination } from './components/Pagination/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState('5');
  const [selectedPage, setSelectedPage] = useState(1);
  const numbersOfPages = utils.getNumbersOfPages(itemsPerPage);
  const startIndexofItems = utils.getStartIndex(itemsPerPage, selectedPage);
  const endIndexofItems = utils.getEndIndex(startIndexofItems, itemsPerPage);
  const items = utils.getItemsListPerPage(startIndexofItems, endIndexofItems);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${startIndexofItems} - ${endIndexofItems} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={e => {
              setItemsPerPage(e.target.value);
              if (selectedPage !== 1) {
                setSelectedPage(1);
              }
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
        numbersOfPages={numbersOfPages}
        selectedPage={selectedPage}
        onPageChange={page => setSelectedPage(page)}
      />

      <ul>
        {items.map(item => {
          return (
            <li data-cy="item" key={item}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
