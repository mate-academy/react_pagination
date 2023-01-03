import React, { useEffect, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const total = 42;
const optionValues = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [extremeItems, setExtremeItems] = useState({ start: 1, end: perPage });
  const [selectedPage, setSelectedPage] = useState(1);

  const { start, end } = extremeItems;

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setPerPage(+value);
    setExtremeItems({ start: 1, end: +value });
  };

  useEffect(() => {
    const pagesStep = perPage * (selectedPage - 1);

    setExtremeItems(
      {
        start: pagesStep + 1,
        end: pagesStep + perPage < total
          ? pagesStep + perPage
          : total,
      },
    );
  }, [selectedPage]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${start} - ${end} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            value={perPage}
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={handleSelect}
          >
            {optionValues.map(el => <option value={el} key={el}>{el}</option>)}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={total}
        perPage={perPage}
        currentPage={selectedPage}
        onPageChange={page => setSelectedPage(page)}
      />
      <ul>
        {getNumbers(start, end).map(n => (
          <li data-cy="item" key={n}>
            {`Item ${n}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
