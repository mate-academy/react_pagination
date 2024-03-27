import { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState('5');
  const [currentPage, setCurrentPage] = useState(1);
  const [startItem, setStartItem] = useState(1);

  const lastPage = Math.ceil(items.length / +itemsPerPage);

  const lastItemOfLastPage =
    startItem +
    +itemsPerPage -
    1 -
    (startItem + +itemsPerPage - 1 - items.length);

  const lastItemOfPage = startItem + +itemsPerPage - 1;

  const visibleItems = getNumbers(startItem, +itemsPerPage + startItem - 1).map(
    n => `Item ${n}`,
  );

  const lastItem =
    currentPage === lastPage ? lastItemOfLastPage : lastItemOfPage;

  const handleItemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStartItem(1);
    setCurrentPage(1);
    setItemsPerPage(event.target.value);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {startItem} - {lastItem} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleItemChange}
            defaultValue={'5'}
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
        start={setStartItem}
        total={items}
        perPage={visibleItems}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
