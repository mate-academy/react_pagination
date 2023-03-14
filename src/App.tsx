import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items = getNumbers(1, 42).map((n) => (
  <li data-cy="item" key={n}>{`Item ${n}`}</li>
));

export const App: React.FC = () => {
  const total = 42;
  const [valueItem, setValueItem] = useState(3);
  const [selectedPage, setSelectedPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValueItem(+event.target.value);
    setSelectedPage(1);
  };

  const handleLeft = () => {
    setSelectedPage((prev) => prev - 1);
  };

  const handleRight = () => {
    setSelectedPage((prev) => prev + 1);
  };

  const handleMove = (pageNow: string) => {
    setSelectedPage(+pageNow);
  };

  const onPageChange = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const pageNow = event.currentTarget.parentElement?.id || '';

    switch (pageNow) {
      case 'prev':
        handleLeft();
        break;

      case 'next':
        handleRight();
        break;

      default:
        handleMove(pageNow);
        break;
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
