import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const options = ['3', '5', '10', '20'];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<string>(options[1]);
  const [currentPage, setCurrentPage] = useState(0);
  const countPage = Math.ceil(items.length / Number(perPage));
  const fromItem = Number(perPage) * currentPage + 1;
  const toItem = fromItem + Number(perPage) - 1;

  const handleChangCountItem = (
    { target }: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPerPage(target.value);

    if (currentPage) {
      setCurrentPage(0);
    }
  };

  const handleDeacr = () => currentPage && setCurrentPage(
    prev => prev - 1,
  );

  const handleIncr = () => currentPage + 1 < countPage && setCurrentPage(
    prev => prev + 1,
  );

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage + 1} (items ${fromItem} - ${toItem > items.length ? items.length : toItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleChangCountItem}
          >
            {options.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        total={items}
        perPage={perPage}
        countPage={countPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onDeac={handleDeacr}
        onInc={handleIncr}
      />
    </div>
  );
};

export default App;
