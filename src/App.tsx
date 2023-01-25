import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const pageSelectors = ['3', '5', '10', '20'];

export const App: React.FC = () => {
  // const [selectedTab, setSelectedTab] = useState('#1');
  // const [visibleItems] = useState(items);
  const [selectedSelector, setSelectedSelector] = useState(pageSelectors[1]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page 1 (items 1 - 5 of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={selectedSelector}
            onChange={((event) => {
              setSelectedSelector(event.target.value);
            })}
          >
            {pageSelectors.map((selector) => (
              <option
                value={selector.length}
                key={selector.length}
              >
                {selector}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        items={items}
      />
    </div>
  );
};

export default App;
