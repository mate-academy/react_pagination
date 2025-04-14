import React from 'react';
import './App.css';
import { Pagination } from './components/Pagination';
import { getNumbers } from './utils';

const items: string[] = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [itemPerPage, setItemPerPage] = React.useState(5);
  const [currentPage, setCurrentPage] = React.useState(1);

  const numberOfItems = items.length;
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = currentPage * itemPerPage;

  const visibleItems = items.slice(startIndex, endIndex);

  const handlePerPageSelector = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setItemPerPage(parseInt(event.target.value));
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${startIndex + 1} - ${endIndex > numberOfItems ? numberOfItems : endIndex} of ${numberOfItems})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              handlePerPageSelector(event)
            }
            defaultValue={itemPerPage}
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

      {/* Move this markup to Pagination */}

      <Pagination
        total={numberOfItems}
        perPage={itemPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {visibleItems.map((item, index) => (
          <li key={index} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
