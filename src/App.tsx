import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers, TOTAL_ITEMS, SELECTOR_OPTIONS } from './utils';
// import { values } from 'cypress/types/lodash';

const items = getNumbers(1, TOTAL_ITEMS).map(n => `Item ${n}`);

function useItems(itemsArr: string[], currentPage: number, perPage: number) {
  const useItemsList: string[] = [...itemsArr];

  return useItemsList.splice((currentPage - 1) * perPage, perPage);
}

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const itemsInUse = useItems(items, currentPage, perPage);

  const handlePrePageClick = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {perPage * currentPage - perPage + 1} -{' '}
        {perPage * currentPage > TOTAL_ITEMS
          ? TOTAL_ITEMS
          : perPage * currentPage}{' '}
        of {TOTAL_ITEMS})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handlePrePageClick}
            value={perPage}
          >
            {SELECTOR_OPTIONS.map(option => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={42}
        perPage={perPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <ul>
        {itemsInUse.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
