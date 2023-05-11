import React, { useState } from 'react';
import { Pagination } from './components/Pagination';
import './App.css';
import { getNumbers } from './utils';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState(5);
  const [active, setActive] = useState(1);
  const optionValue = [3, 5, 10, 20];
  const sliceItems = items.slice(
    selectedValue * active - selectedValue, selectedValue * active,
  );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${active} `}
        {`(${sliceItems[0].replace('m', 'ms').replace('I', 'i')} - ${sliceItems[sliceItems.length - 1].split(' ')[1]} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={selectedValue}
            onChange={(e) => {
              setSelectedValue(+e.currentTarget.value);
              setActive(1);
            }}
          >
            {optionValue.map(value => (
              <option
                key={value}
                defaultValue={value}
              >
                {+value}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={items.length}
        perPage={selectedValue}
        currentPage={active}
        onPageChange={setActive}
      />

      <ul>
        {sliceItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
