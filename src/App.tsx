import React, { useState } from 'react';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [item, setItem] = useState<number[]>([1, 5]);
  const total = 42;
  const options = ['3', '5', '10', '20'];

  const onPageChange = (page: number) => {
    if (currentPage !== page) {
      setCurrentPage(page);
    }
  };

  const onItemChange = (el: number[]) => {
    setItem(el);
  };

  function selectHendler(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectValue = +event.currentTarget.value;

    setPerPage(selectValue);
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${item[0]} - ${item[1]} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={selectHendler}
            defaultValue={5}
          >
            {options.map(opt => (
              <option
                value={opt}
                key={opt}
              >
                {opt}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onItemChange={onItemChange}
      />
    </div>
  );
};
