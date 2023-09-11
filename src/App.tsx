/* eslint-disable max-len */
import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { List } from './components/List';
import { PageSizeSelect } from './components/PageSizeSelect/PageSizeSelect';

const items = getNumbers(1, 42)
  .map((n, index) => ({ name: `Item ${n}`, id: index }));

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPAge] = useState(5);
  const [selectedPage, setSelectedPage] = useState(1);

  const startItem = (selectedPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(selectedPage * itemsPerPage, items.length);

  const handleOnPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPage(1);
    setItemsPerPAge(+event.target.value);
  };

  const handleOnClickChange = (page: number) => {
    if (page !== selectedPage) {
      setSelectedPage(page);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${startItem} - ${endItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <PageSizeSelect
            perPage={itemsPerPage}
            onChangeSize={handleOnPageChange}
          />
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={items.length}
        perPage={itemsPerPage}
        currentPage={selectedPage}
        onPageChange={handleOnClickChange}
      />

      <List
        items={items}
        perPage={itemsPerPage}
        currentPage={selectedPage}
      />
    </div>
  );
};

export default App;
