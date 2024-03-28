import { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';
import { ItemsList } from './components/ItemsList/ItemsList';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState('5');
  const [currentPage, setCurrentPage] = useState(1);

  const lastPage = Math.ceil(items.length / +itemsPerPage);

  const lastItemOfLastPage =
    currentPage +
    +itemsPerPage -
    1 -
    (currentPage + +itemsPerPage - 1 - items.length);

  const lastItemOfPage = (currentPage - 1) * +itemsPerPage + +itemsPerPage;

  const firstItem = (currentPage - 1) * +itemsPerPage + 1;

  const lastItem =
    currentPage === lastPage ? lastItemOfLastPage : lastItemOfPage;

  const visibleItems = getNumbers(
    (currentPage - 1) * +itemsPerPage,
    (currentPage - 1) * +itemsPerPage + +itemsPerPage - 1,
  );

  const handleItemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setItemsPerPage(event.target.value);
  };

  return (
    <>
      <div className="container">
        <h1>Items with Pagination</h1>

        <p className="lead" data-cy="info">
          Page {currentPage} (items {firstItem} - {lastItem} of 42)
        </p>

        <div className="form-group row">
          <div className="col-3 col-sm-2 col-xl-1">
            <select
              data-cy="perPageSelector"
              id="perPageSelector"
              className="form-control"
              onChange={handleItemChange}
              defaultValue={itemsPerPage}
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
          total={items}
          visibleItems={visibleItems}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        <ul>
          {items.length > 0 && (
            <ItemsList items={visibleItems} total={items.length} />
          )}
        </ul>
      </div>
    </>
  );
};

export default App;
