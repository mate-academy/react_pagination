import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils'; // дать 2 значения в качестве аргументов и получить масив всех чисел

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const maxItems = 42;

export const App: React.FC = () => {
  const [value, setValue] = useState<string>('5');
  const [column, setColumn] = useState<number>(0);

  const cheakChenge = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
    setColumn(0);
  };

  const start = column * Number(value);
  const end = Math.min(start + Number(value), maxItems);
  const items: string[] = [];

  getNumbers(start + 1, end).map(item => items.push(`Item ${item}`));

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {column + 1} (items {start + 1} - {end} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={cheakChenge}
            defaultValue={5}
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
        value={value}
        column={column}
        setColumn={setColumn}
        maxItems={maxItems}
        getNumbers={getNumbers}
      />
      <ul>
        {items.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
