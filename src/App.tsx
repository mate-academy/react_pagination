import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [query, setQuery] = useState(5);
  const [selectedPage, setSelectedPage] = useState(1);
  const lastPage = Math.ceil(items.length / query);

  const totalItems = items.length;
  const sliceTo = selectedPage * query;
  const sliceFrom = sliceTo - query;
  const itemsList = items.slice(sliceFrom, sliceTo);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery(+event.target.value);
    setSelectedPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${sliceFrom + 1} - ${sliceTo > totalItems ? totalItems : sliceTo} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={query}
            onChange={handleChange}
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
        lastPage={lastPage}
        setSelectedPage={setSelectedPage}
        selectedPage={selectedPage}
      />

      <ul>
        {itemsList.map(item => (
          <li data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
