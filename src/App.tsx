import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const options = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(options[1]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const lastItemIndex = currentPage * perPage;
  const firstItemIndex = lastItemIndex - perPage + 1;
  const current = items.slice(firstItemIndex - 1, lastItemIndex);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const selectedOptionValue = Number(event.target.value);

    setPerPage(selectedOptionValue);
    setCurrentPage(1);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemIndex} - ${
          lastItemIndex > items.length ? items.length : lastItemIndex
        } of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleSelectChange}
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
        total={items.length}
        perPage={perPage}
        onPageChange={onPageChange}
        currentPage={currentPage}
      />
      <ul>
        {current.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
