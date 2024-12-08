import { useState } from 'react';

import './App.css';
import { getNumbers } from './utils';

import { Pagination } from './components/Pagination';
import { ListOfItems } from './components/ListOfItems/ListOfItems';

import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

const totalItems = items.length;

const perPageSelector = [3, 5, 10, 20];

export const App = () => {
  const [itemsPerPage, setItemsPerPage] = useState(perPageSelector[1]);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = items.slice(startIndex, lastIndex);

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${lastIndex} of ${totalItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleItemsPerPageChange}
            defaultValue={itemsPerPage}
          >
            {perPageSelector.map(option => (
              <option key={option} value={option}>
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
        total={totalItems}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page: number) => {
          setCurrentPage(page);
        }}
      />
      <ListOfItems currentItems={currentItems} />
    </div>
  );
};

export default App;
