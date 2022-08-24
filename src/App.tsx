import { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const pageStart = (page - 1) * itemsPerPage;
  const itemsLength = items.length;
  const pageEnd = itemsLength < page * itemsPerPage
    ? itemsLength
    : page * itemsPerPage;

  const showItems = items.slice(pageStart, pageEnd);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${pageStart + 1}
          ${' - '}
          ${pageEnd})
          ${' of '}
          ${items.length}
          `}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(event) => {
              setItemsPerPage(+event.target.value);
              setPage(1);
            }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label
          htmlFor="perPageSelector"
          className="col-form-label col"
        >
          items per page
        </label>
      </div>

      <Pagination
        items={itemsLength}
        itemsPerPage={itemsPerPage}
        currentPage={page}
        onChangePage={setPage}
      />
      <ul>
        {showItems.map(item => (
          <li key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
