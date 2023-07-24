import React, { useState } from 'react';

import { LAST_ITEM, PER_PAGE_VALUES } from './constants';
import { getNumbers, allChunks } from './utils';

import { Pagination } from './components/Pagination';
import { PerPageSelector } from './components/PerPageSelector';
import { Page } from './components/Page';

import './App.css';

export const App: React.FC = () => {
  const [perPageSelector, setPerPageSelector] = useState(5);
  const [paginationItem, setPaginationItem] = useState(1);

  const items = getNumbers(1, LAST_ITEM);
  const itemsOnPage = allChunks(items, perPageSelector)[paginationItem - 1];

  const infoText = `Page ${paginationItem} (items ${itemsOnPage[0]} -
    ${itemsOnPage[itemsOnPage.length - 1]} of ${LAST_ITEM})`;

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setPerPageSelector(+event.target.value);
    setPaginationItem(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {infoText}
      </p>

      <PerPageSelector
        perPage={perPageSelector}
        handleChange={() => handleChange}
      />

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={perPageSelector}
            onChange={handleChange}
          >
            {PER_PAGE_VALUES.map(element => (
              <option value={element} key={`#${element}`}>{element}</option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          Prev
        </label>
      </div>

      <Pagination
        total={LAST_ITEM}
        perPage={perPageSelector}
        currentPage={paginationItem}
        onPageChange={(page) => {
          if (paginationItem !== page) {
            setPaginationItem(page);
          }
        }}
      />

      <Page
        items={itemsOnPage}
      />
    </div>
  );
};

export default App;
