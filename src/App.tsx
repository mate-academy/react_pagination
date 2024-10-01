import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { ItemPerPage } from './types/ItemPerPage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

const itemsCount: ItemPerPage[] = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<ItemPerPage>(5);

  const startItem = itemsPerPage * selectedPage - itemsPerPage;
  const finishItem =
    itemsPerPage * selectedPage > items.length
      ? items.length
      : itemsPerPage * selectedPage;

  const preparedItem = items.slice(startItem, finishItem);

  const handleSetItemsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(+event.target.value as ItemPerPage);
    setSelectedPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {selectedPage} (items {startItem + 1} - {finishItem} of{' '}
        {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={event => handleSetItemsPerPage(event)}
          >
            {itemsCount.map(item => (
              <option value={`${item}`} key={item}>
                {item}
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
        perPage={itemsPerPage}
        currentPage={selectedPage}
        onPageChange={page => setSelectedPage(page)}
      />
      <ul>
        {preparedItem.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
