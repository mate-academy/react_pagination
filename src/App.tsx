import React, { useState } from 'react';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import './App.css';

const Item: React.FC<{ number: number }> = ({ number }) => (
  <li data-cy="item">{`Item ${number}`}</li>
);

const itemsGenerator = (start: number, end: number): JSX.Element[] => {
  return getNumbers(start, end)
    .map(n => <Item key={n} number={n} />);
};

export const App: React.FC = () => {
  const total = 42;
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const currentItemNum = currentPage * perPage - perPage + 1;
  const lastItemNum = currentPage * perPage > total
    ? total
    : currentPage * perPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${currentItemNum} - ${lastItemNum} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setPerPage(parseInt(event.target.value, 10));
              setCurrentPage(1);
            }}
            value={perPage}
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
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={(page: number) => {
          if (
            currentPage !== page
            && page > 0
            && page <= Math.ceil(total / perPage)
          ) {
            setCurrentPage(page);
          }
        }}
      />

      <ul>
        {itemsGenerator(currentItemNum, lastItemNum)}
      </ul>
    </div>
  );
};

export default App;
