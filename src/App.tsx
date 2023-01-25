import { FC, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

//! Required Props on <Pagination /> :
// * <Pagination
// * total={42} // total number of items to paginate
// * perPage={5} // number of items per page
// * currentPage={1} // optional with 1 by default
// * onPageChange={(page) => { ... }}
// * / >

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const total = items.length;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page 1 (items 1 - 5 of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={(event) => setItemsPerPage(Number(event.target.value))}
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
      <Pagination />
    </div>
  );
};

export default App;
