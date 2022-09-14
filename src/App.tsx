import React, { useEffect, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { Items } from './components/Pagination/Items';
import { getNumbers } from './utils';

const itemsFromServer = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [items, setItems] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const fetchItems = () => {
      setLoading(true);
      setItems(itemsFromServer);
      setLoading(false);
    };

    fetchItems();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page
        {' '}
        {currentPage}
        {' '}
        (items
        {' '}
        {indexOfFirstItem + 1}
        {' '}
        -
        {' '}
        {currentItems.map(x => x.split(' ').pop()).pop()}
        {' '}
        of
        {' '}
        {items.length}
        )
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
              setCurrentPage(1);
            }}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
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
        totalItems={items.length}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        currentPage={currentPage}
      />

      <Items
        items={currentItems}
        loading={loading}
      />
    </div>
  );
};

export default App;
