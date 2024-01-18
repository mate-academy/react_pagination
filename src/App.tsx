import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemPerPage, setItemPerPage] = React.useState(5);
  const [pagiPage, setPagiPage] = React.useState(1);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${pagiPage} (items ${itemPerPage * pagiPage - itemPerPage + 1} - ${itemPerPage * pagiPage <= items.length ? itemPerPage * pagiPage : items.length} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemPerPage}
            onChange={event => {
              setItemPerPage(+event.target.value);
              setPagiPage(1);
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
        items={items}
        itemPerPage={itemPerPage}
        pagiPage={pagiPage}
        setPagiPage={setPagiPage}
      />
    </div>
  );
};

export default App;
