import React, { useState } from 'react';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);
const perPageList = [3, 5, 10, 20];

type IperPageProps = {
  perPage: number;
  onPerPageChange: (value: number) => void;
  onPageChange: (value: number) => void;
};

export const IperPage: React.FC<IperPageProps> = ({ perPage,  onPerPageChange, onPageChange,}) => {
  return (
    <select
      data-cy="perPageSelector"
      id="perPageSelector"
      className="form-control"
      onChange={event => {
        onPerPageChange(Number(event.target.value));
        onPageChange(1);
      }}
      value={perPage}
    >
      {perPageList.map(p => (
        <option value={p} key={p}>
          {p}
        </option>
      ))}
    </select>
  );
};

export const App: React.FC = () => {
  const [page, selectPage] = useState(1);
  const [perPage, selectPerPage] = useState(5);

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage <= 42 ? startIndex + perPage : 42;

  let itemsPerPage: string[] = [];

  itemsPerPage = items.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {startIndex + 1} - {endIndex} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <IperPage
            perPage={perPage}
            onPerPageChange={selectPerPage}
            onPageChange={selectPage}
          />
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={items.length}
        perPage={perPage}
        pageSelected={page}
        onPageSelected={selectPage}
      />

      <ul>
        {itemsPerPage.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
