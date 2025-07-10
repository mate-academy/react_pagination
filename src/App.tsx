import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';

import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perItems, setPerItems] = useState<string>('5');
  const [numberPage, setNumberPage] = useState<string>('#1');

  const getNumber = (number: string) => {
    setPerItems(number);
  };

  const resetNumberPage = () => {
    setNumberPage('#1');
  };

  const passedItems =
    Number(perItems) * Number(numberPage.slice(1)) - Number(perItems);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {numberPage.slice(1)} (items {passedItems + 1} -{' '}
        {Number(perItems) + passedItems} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={'5'}
            onClick={event => getNumber(event.currentTarget.value)}
            onChange={() => resetNumberPage()}
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
        perPage={Number(perItems)} // number of items per page
        currentPage={Number(
          numberPage.slice(1),
        )} /* optional with 1 by default */
        onPageChange={page => setNumberPage(page)}
      />
    </div>
  );
};

export default App;
