// import React, { useState } from 'react';
import { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';
// import { event } from 'cypress/types/jquery';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [lengthItem, setLengthItem] = useState('5');
  const [currentPagin, setCurrentPagin] = useState(1);
  const [startItem, setStartItem] = useState(1);

  const LAST_PAGE = Math.ceil(items.length / +lengthItem);

  const LAST_ITEM_OF_LAST_PAGE =
    startItem + +lengthItem - 1 - (startItem + +lengthItem - 1 - items.length);

  const LAST_ITEM_OF_PAGE = startItem + +lengthItem - 1;

  const VISIBLE_ITEMS = getNumbers(startItem, +lengthItem + startItem - 1).map(
    n => `Item ${n}`,
  );

  const setNewValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStartItem(1);
    setCurrentPagin(1);
    setLengthItem(event.target.value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPagin} (items {startItem} -{' '}
        {currentPagin === LAST_PAGE
          ? LAST_ITEM_OF_LAST_PAGE
          : LAST_ITEM_OF_PAGE}{' '}
        of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={event => {
              setNewValue(event);
            }}
            defaultValue={'5'}
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
        start={setStartItem}
        total={items}
        perPage={VISIBLE_ITEMS}
        currentPage={currentPagin}
        onPageChange={setCurrentPagin}
      />
    </div>
  );
};

export default App;
