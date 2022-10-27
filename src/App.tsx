import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [activePageLink, setActivePageLink] = useState(1);

  const startRender = (activePageLink - 1) * itemsPerPage;
  const endRender = activePageLink * itemsPerPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${activePageLink} items ${startRender + 1} - ${items.length > endRender ? endRender : items.length} of ${items.length}`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(e) => {
              setItemsPerPage(+e.target.value);
              setActivePageLink(1);
            }}
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
        items={items}
        total={items.length} // total number of items to paginate
        perPage={itemsPerPage} // number of items per page
        currentPage={activePageLink} /* optional with 1 by default */
        onPageChange={setActivePageLink}
      />
    </div>
  );
};

export default App;
