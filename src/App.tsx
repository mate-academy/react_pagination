import React, { useState } from 'react';
import './App.scss';
import { Paginator } from './component/Paginator';

const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);

  const total = 42;
  const numOfPage = Math.ceil(total / perPage);

  return (
    <div className="container">
      <Paginator
        total={total}
        perPage={perPage}
        pages={numOfPage}
      />

      <div className="form-floating m-3">
        <select
          className="form-select"
          id="floatingSelect"
          aria-label="Floating label select example"
          onChange={(event) => setPerPage(+event.target.value)}
          defaultValue={5}
          data-cy="perPageSelector"
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <label htmlFor="floatingSelect">Choose the number of cards</label>
      </div>

    </div>
  );
};

export default App;
