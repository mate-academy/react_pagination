import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const ITEMS_NUMBER = 42;
const items = getNumbers(1, ITEMS_NUMBER)
  .map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState(5);

  const handleSelectChange = (
    selectEvent: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedOption(Number(selectEvent.target.value));
    setSelectedPage(1);
  };

  const pagesNumber = Math.ceil(ITEMS_NUMBER / selectedOption);
  const firstItemIndex = selectedOption * selectedPage - (selectedOption - 1);
  const lastItemIndex = selectedPage === pagesNumber
    ? ITEMS_NUMBER
    : selectedOption * selectedPage;
  const currentItems = items.slice(firstItemIndex - 1, lastItemIndex);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${selectedPage} (items ${firstItemIndex} - ${lastItemIndex} of ${ITEMS_NUMBER})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={selectedOption}
            onChange={handleSelectChange}
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
        total={ITEMS_NUMBER}
        perPage={selectedOption}
        currentPage={selectedPage}
        onPageChange={(page: number) => setSelectedPage(page)}
      />
      <ul>
        {currentItems.map(item => (
          <li data-cy="item" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
