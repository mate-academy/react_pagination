import React, { useState } from 'react';

import { LAST_ITEM } from './constants';
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

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPageSelector(+event.target.value);
    setPaginationItem(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {infoText}
      </p>

      <PerPageSelector
        perPage={perPageSelector}
        handleChange={handleChange}
      />

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
