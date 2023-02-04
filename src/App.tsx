import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map((n) => `Item ${n}`);

export const App: React.FC = () => {
  const [perPageOption, setPerPageOption] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPageOption(+event.target.value);
    setCurrentPage(1);
  };

  const splicedItems = [...items]
    .splice((currentPage - 1) * perPageOption, perPageOption);

  const indexLast = splicedItems[splicedItems.length - 1];
  const itemStart = parseInt(splicedItems[0].replace(/[^\d]/g, ''), 10);
  const itemEnd = parseInt(indexLast.replace(/[^\d]/g, ''), 10);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${itemStart} - ${itemEnd} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleSelectChange}
            value={perPageOption}
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

      {/* Move this markup to Pagination */}
      <Pagination
        total={42}
        perPage={perPageOption}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {splicedItems.map((item) => (
          <li data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
