import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

enum PerPage {
  three = '3',
  five = '5',
  ten = '10',
  twenty = '20',
}

interface Option {
  id: number;
  value: string;
}

const options: Option[] = [
  { id: 1, value: PerPage.three },
  { id: 2, value: PerPage.five },
  { id: 3, value: PerPage.ten },
  { id: 4, value: PerPage.twenty },
];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<string>(PerPage.five);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleOnChangeValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(event.target.value);
    setCurrentPage(1);
  };

  const onChangePage = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const startEl = (currentPage - 1) * Number(perPage) + 1;
  const endEl =
    currentPage * Number(perPage) > items.length
      ? items.length
      : currentPage * Number(perPage);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startEl} - {endEl} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={handleOnChangeValue}
          >
            {options.map(item => (
              <option key={item.id} value={item.value}>
                {item.value}
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
        perPage={Number(perPage)}
        currentPage={currentPage}
        onPageChange={onChangePage}
      />
      <ul>
        {items.slice(startEl - 1, endEl).map((el, index) => (
          <li data-cy="item" key={index}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
