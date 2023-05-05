import { FC, useState } from 'react';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42);

export const App: FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [total] = useState(items.length);

  const firstItemOfPage = (currentPage - 1) * perPage + 1;
  const lastItemOfPage = currentPage * perPage > total
    ? total
    : currentPage * perPage;

  const handlePerPageChange = (page: number) => {
    setPerPage(page);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemOfPage} - ${lastItemOfPage} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={(e) => handlePerPageChange(Number(e.target.value))}
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
        onPageChange={setCurrentPage}
      />
      <ul>
        {
          getNumbers(firstItemOfPage, lastItemOfPage).map(n => (
            <li key={n} data-cy="item">
              {`Item ${items[n - 1]}`}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default App;
