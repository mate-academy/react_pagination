import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const selectItem = [3, 5, 10, 20];

  const [pageSelected, setPageSelected] = useState(5);
  const [pageStart, setPageStart] = useState(1);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setPageStart(1);
    setPageSelected(+value);
  };

  const indexLastElement = pageStart * pageSelected;
  const indexFirstElement = indexLastElement - pageSelected;

  const currentElements = items.slice(indexFirstElement, indexLastElement);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${pageStart} (items ${indexFirstElement + 1} - ${indexLastElement} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={pageSelected}
            onChange={handleSelect}
          >
            {selectItem.map(element => (
              <option key={element} value={element}>
                {element}
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
        perPage={pageSelected}
        currentPage={pageStart}
        onPageChange={setPageStart}
      />

      <ul>
        {currentElements.map(item => (
          <li key={item} data-cy="item">{`${item}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
