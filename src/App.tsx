import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { items } from './components/Items';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const App: React.FC = () => {
  const itemsPerPageOptions
    = [3, 5, 10, 20];
  const [itemsNumberPerPage, setItemsNumberPerPage]
    = useState(itemsPerPageOptions[1]);
  const [activePageNumber, setActivePage]
    = useState(1);
  const handleSetCurrentPage
    = (pageNum: number): void => {
      if (pageNum < 0
        || pageNum > Math.ceil(items.length / itemsNumberPerPage)) {
        return;
      }

      setActivePage(pageNum);
    };

  const handleItemsPerPageOptions
    = (event: React.ChangeEvent<HTMLSelectElement>): void => {
      setItemsNumberPerPage(Number(event.target.value));
      setActivePage(1);
    };

  const itemNumberStart
    = itemsNumberPerPage * (activePageNumber - 1) + 1;
  const itemNumberEnd
    = Math.min(
      itemsNumberPerPage * activePageNumber,
      items.length,
    );

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {
          `Page ${activePageNumber} (items ${itemNumberStart} - ${itemNumberEnd} of ${items.length})`
        }
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsNumberPerPage}
            onChange={handleItemsPerPageOptions}
          >
            {itemsPerPageOptions.map((option) => (
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
        total={items.length}
        perPage={itemsNumberPerPage}
        currentPage={activePageNumber}
        onPageChange={handleSetCurrentPage}
      />

      <ul>
        {
          items.slice(
            itemsNumberPerPage * (activePageNumber - 1),
            itemsNumberPerPage * activePageNumber,
          ).map(item => (<li data-cy="item">{item}</li>))
        }
      </ul>

    </div>
  );
};

export default App;
