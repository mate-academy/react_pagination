import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  useEffect(() => {
    const initialVisibleItems = items.slice(0, itemsPerPage);

    setVisibleItems(initialVisibleItems);
  }, []);

  const handleSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newItemsPerPage = Number(event.target.value);

      setItemsPerPage(newItemsPerPage);
      setCurrentPage(1);
      setVisibleItems(items.slice(0, newItemsPerPage));
    },
    [],
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setVisibleItems(items
      .slice((page - 1) * itemsPerPage, page * itemsPerPage));
  };

  const firstVisibleItem = useMemo(() => {
    return (currentPage - 1) * itemsPerPage + 1;
  }, [currentPage, itemsPerPage]);

  const lastVisibleItem = useMemo(() => {
    return Math.min((currentPage * itemsPerPage), items.length);
  }, [currentPage, itemsPerPage, items]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstVisibleItem} - ${lastVisibleItem} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={handleSelectChange}
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
        total={items.length} // total number of items to paginate
        itemsPerPage={itemsPerPage} // number of items per page
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <ul>
        {visibleItems.map(item => <li key={item} data-cy="item">{item}</li>)}
      </ul>
    </div>
  );
};

export default App;
