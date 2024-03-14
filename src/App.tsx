import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
// import { sortBy } from 'cypress/types/lodash';
// import { event } from 'cypress/types/jquery';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NUMBER_OF_ITEMS = 42;
const FIRST_ITEM = 1;

const items = getNumbers(FIRST_ITEM, NUMBER_OF_ITEMS).map(n => `Item ${n}`);

function getNumberOfPages(itemsPerPage: number): number {
  const numberOfPages = Math.ceil(NUMBER_OF_ITEMS / itemsPerPage);

  return numberOfPages;
}

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const numberOfPages = getNumberOfPages(itemsPerPage);
  const [activePage, setActivePage] = useState(1);
  const lastItemOnPage = activePage * itemsPerPage;
  const firstItemOnPage = lastItemOnPage - itemsPerPage + 1;
  const listOfItems = [...items].splice(firstItemOnPage - 1, itemsPerPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${activePage} (items ${firstItemOnPage} - ${lastItemOnPage > NUMBER_OF_ITEMS ? NUMBER_OF_ITEMS : lastItemOnPage} of ${NUMBER_OF_ITEMS})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setItemsPerPage(Number(event.target.value));
              setActivePage(1);
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
        numberOfPages={numberOfPages}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <ul>
        {listOfItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
