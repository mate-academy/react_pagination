import './App.css';
import React, { useMemo, useState } from 'react';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination/Pagination';
import { Items } from './components/Items/Items';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

const itemsNumbers: number[] = [];

for (let i = 1; i <= items.length; i += 1) {
  itemsNumbers.push(i);
}

export const App: React.FC = () => {
  const [perPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (value: number) => {
    setCurrentPage(value);
  };

  const filtredItems = useMemo(() => {
    return itemsNumbers
      .filter(item => item <= perPage * currentPage
        && item > perPage * (currentPage - 1))
      .map(item => `Item ${item}`);
  }, [perPage, currentPage]);

  const fromPage = perPage * (currentPage - 1) + 1;
  const ToPage = perPage * currentPage >= 42 ? 42 : perPage * currentPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${fromPage} - ${ToPage} of 42)`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue="5"
            onChange={(event) => {
              setItemsPerPage(+(event.target.value));
              setCurrentPage(1);
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
        total={itemsNumbers.length}
        perPage={perPage}
        onPageChange={onPageChange}
        currentPage={currentPage}
      />

      <ul>
        <Items items={filtredItems} />
      </ul>
    </div>
  );
};

export default App;
