import React from 'react';
import './App.css';
import { useState } from 'react';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [chosenIPP, setChosenIPP] = useState(5);
  const [activePage, setActivePage] = useState(1);

  const handleIPPChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChosenIPP(Number(event.target.value));
    setActivePage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {activePage} (items{' '}
        {`${chosenIPP * activePage - chosenIPP + 1} - ${activePage !== Math.ceil(items.length / chosenIPP) ? chosenIPP * activePage : items.length}`}{' '}
        of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleIPPChange}
            defaultValue="5"
            value={chosenIPP}
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
        total={items}
        perPage={chosenIPP}
        currentPage={activePage}
        onPageChange={setActivePage}
      />
    </div>
  );
};

export default App;
