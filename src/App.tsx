import React, { useCallback, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const renderedItems = [...items]
    .splice((currentPage - 1) * itemsPerPage, itemsPerPage);

  const handleSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setItemsPerPage(+event.target.value);
      setCurrentPage(1);
    }, [],
  );

  const fromItem = renderedItems[0].replace('Item ', '');
  const toItem = renderedItems[renderedItems.length - 1].replace('Item ', '');

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${fromItem} - ${toItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleSelectChange}
            defaultValue={5}
          >
            {[3, 5, 10, 20].map(count => (
              <option value={count} key={count}>
                {count}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        total={items.length} // total number of items to paginate
        perPage={itemsPerPage} // number of items per page
        currentPage={currentPage} /* optional with 1 by default */
        onPageChange={setCurrentPage}
      />

      <ul>
        {renderedItems.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
