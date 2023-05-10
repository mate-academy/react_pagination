import React, { useState } from 'react';
import { Pagination } from './components/Pagination';
import './App.css';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState('5');
  const [active, setActive] = useState(1);
  const optionValue = ['3', '5', '10', '20'];
  const pagesLength = items.length / +selectedValue;
  const sliceItems = items.slice(
    +selectedValue * active - +selectedValue, +selectedValue * active,
  );

  const createPageList = () => {
    const result = [];

    for (let i = 0; i < pagesLength; i += 1) {
      result.push(
        <li
          key={`#${i + 1}`}
          className={`page-item ${i + 1 === active ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            onClick={() => setActive(i + 1)}
            className="page-link"
            href={`#${i + 1}`}
          >
            {i + 1}
          </a>
        </li>,
      );
    }

    return result;
  };

  const itemList = sliceItems.map(item => (
    <li key={item} data-cy="item">
      {item}
    </li>
  ));

  const pageList = createPageList();

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
              setSelectedValue(e.currentTarget.value);
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
        pageList={pageList}
        itemList={itemList}
        active={active}
        setActive={setActive}
      />
    </div>
  );
};

export default App;
