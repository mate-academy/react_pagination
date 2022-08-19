import { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [selected, setSelected] = useState(1);
  const [perPageSelector, setPerPageselector] = useState('5');

  const pageBottom = (selected - 1) * +perPageSelector;
  const pageTop = selected * +perPageSelector;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selected} (items ${pageBottom + 1}
          ${' - '}
          ${pageTop <= items.length ? pageTop : items.length})
          ${' of '}
          ${items.length}
          `}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPageSelector}
            onChange={(event) => {
              setPerPageselector(event.target.value);
              setSelected(1);
            }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
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
        items={items}
        perPageSelector={+perPageSelector}
        selected={selected}
        setSelected={setSelected}
      />
      <ul>
        {items.filter((_, index) => {
          return index >= pageBottom
                  && index < pageTop;
        }).map(item => (
          <li
            data-cy="item"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
