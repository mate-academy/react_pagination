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
  const [currentItem, setCurrentItem] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const fetchItems = () => {
      setLoading(true);
      setItems(itemsFromServer);
      setLoading(false);
    };

    fetchItems();
  }, []);

  const indexOfLastItem = currentItem * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (page: number) => setCurrentItem(page);
  const nextPage = () => setCurrentItem(currentItem + 1);
  const prevtPage = () => setCurrentItem(currentItem - 1);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page
        {' '}
        {currentItem}
        {' '}
        (items
        {' '}
        {indexOfFirstItem + 1}
        {' '}
        -
        {' '}
        {indexOfLastItem}
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
              setCurrentItem(1);
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
        paginate={paginate}
        nextPage={nextPage}
        prevtPage={prevtPage}
        currentItem={currentItem}
      />

      <Items
        items={currentItems}
        loading={loading}
      />
    </div>
  );
};

export default App;
