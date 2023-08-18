import { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items: string[] = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setItemsPerPage] = useState(5);

  const pageAmount = (Math.ceil(items.length / perPage));

  const idexOfLastItem = currentPage === pageAmount
    ? items.length
    : currentPage * perPage;

  const indexOfFirstItem = idexOfLastItem - perPage;

  const currentItems = items.slice(indexOfFirstItem, idexOfLastItem);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handeleSelectValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${indexOfFirstItem + 1} - ${idexOfLastItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            onChange={handeleSelectValue}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
          >
            <option value="3">3</option>
            <option value="5" selected>5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        perPage={perPage}
        total={items.length}
        currentPage={currentPage}
        onPageChange={onPageChange}

      />
      <ul>
        {currentItems.map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
