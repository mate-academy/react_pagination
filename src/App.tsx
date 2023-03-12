import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42).map((n) => (
  <li data-cy="item" key={n}>{`Item ${n}`}</li>
));

export const App: React.FC = () => {
  const [valueItem, setValueItem] = useState(3);
  const [total] = useState(42);
  const [selectedPage, setSelectedPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValueItem(+event.target.value);
  };

  const onPageChange = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const pageNow = event.currentTarget.parentElement?.id || '';

    if (pageNow === 'prev') {
      setSelectedPage((prev) => prev - 1);
    } else if (pageNow === 'next') {
      setSelectedPage((prev) => prev + 1);
    } else {
      setSelectedPage(+pageNow);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items 1 - ${valueItem} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            value={`${valueItem}`}
            className="form-control"
            onChange={handleChange}
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
        perPage={valueItem}
        currentPage={selectedPage}
        onPageChange={onPageChange}
      />
      <ul>
        {items.slice(
          valueItem * selectedPage - valueItem,
          valueItem * selectedPage,
        )}
      </ul>
    </div>
  );
};

export default App;
