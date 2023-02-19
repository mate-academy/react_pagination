import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [selecetCount, setSelectCount] = useState(5);
  const [itemsCount, setItemCount] = useState(items.length / +selecetCount + 1);
  const [list, setList] = useState(items.slice(0, selecetCount));
  const [step, setStep] = useState(1);

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCount(+event.target.value);
    setStep(1);
    setItemCount(Math.ceil(items.length / +event.target.value));
  };

  const renderSteps = useMemo(() => {
    return [...items].slice(0, itemsCount);
  }, [itemsCount]);

  const returnNumber = (str: string) => str.replace(/\D/g, '');

  useEffect(() => {
    setList(items.slice(0, selecetCount));
  }, [selecetCount]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${step} (items ${returnNumber(list[0])} - ${returnNumber(list[list.length - 1])} of ${items.length})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={selecetCount}
            onChange={onChangeSelect}
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
        renderSteps={renderSteps}
        setStep={setStep}
        setList={setList}
        selecetCount={selecetCount}
        step={step}
        items={items}
        returnNumber={returnNumber}
      />
      <ul>
        {
          list.map((el: string) => <li data-cy="item" key={el}>{el}</li>)
        }
      </ul>
    </div>
  );
};

export default App;
