import React from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { useSearchParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

function spliceItems(
  itemsList: string[],
  start: number,
  end: number,
): string[] {
  return itemsList.slice(start, end);
}

export const App: React.FC = () => {
  const DEFAULT_ITEMS_PER_PAGE = 5;
  const DEFAULT_PAGE = 1;

  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage =
    Number(searchParams.get('perPage')) || DEFAULT_ITEMS_PER_PAGE;
  const currentPage = Number(searchParams.get('page')) || DEFAULT_PAGE;

  const total = items.length;
  const start = (currentPage - 1) * itemsPerPage;
  const end = Math.min(total, currentPage * itemsPerPage);

  const splicedItems = spliceItems(items, start, end);

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const perPage = Number(event.target.value);

    setSearchParams({ page: '1', perPage: String(perPage) });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page), perPage: String(itemsPerPage) });
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${start + 1} - ${end} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
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
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <ul>
        {splicedItems.map(el => (
          <li key={el} data-cy="item">
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
