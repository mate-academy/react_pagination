import { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPageSelector, setPerPageSelector] = useState('5');
  const [selectedPage, setSelectedPage] = useState(1);

  const pageBottomLimit = (selectedPage - 1) * Number(perPageSelector);
  const pageTopLimit = Number(perPageSelector) * selectedPage;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${pageBottomLimit + 1}
          ${' - '}
          ${pageTopLimit <= items.length ? pageTopLimit : items.length}
          ${' of '}
          ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPageSelector}
            onChange={(e) => {
              setPerPageSelector(e.target.value);
              setSelectedPage(1);
            }}
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
        items={items}
        perPageSelector={perPageSelector}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      <ul>
        {items
          .filter((_, index) => {
            return index >= pageBottomLimit
              && index < pageTopLimit;
          })
          .map(el => (
            <li data-cy="item" key={el}>{el}</li>
          ))}
      </ul>
    </div>
  );
};

export default App;
