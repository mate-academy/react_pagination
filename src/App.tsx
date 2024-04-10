import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const maxItems = 42;

export const App: React.FC = () => {
  const [value, setValue] = useState<string>('3');
  const [column, setColumn] = useState<number>(0);

  const cheakChenge = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
    setColumn(0);
  };

  const Start = column * Number(value);
  const End = Math.min(Start + Number(value), maxItems);
  const Items: string[] = [];

  for (let i = Start + 1; i <= End; i++) {
    Items.push(`Item ${i}`);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {column + 1} (items {Start + 1} - {End} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={cheakChenge}
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
      />
      <ul>
        {Items.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
