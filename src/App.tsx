import React, { useState } from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

const TOTAL = 42;
const PerPagesList = [3, 5, 10, 20];

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(PerPagesList[1]);
  const [currentItem, setCurrentItem] = useState(1);

  const maxPages = currentItem + perPage - 1;

  const onPageChange = (page: number) => setCurrentItem(page);

  const handleItemsPerPageClick = (perP: number) => {
    setPerPage(() => perP);
    setCurrentItem(1);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${maxPages / perPage} (items ${currentItem} - ${maxPages > TOTAL
          ? TOTAL
          : maxPages} of ${TOTAL})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={PerPagesList[1]}
          >
            {PerPagesList.map(perP => (
              <option
                key={perP}
                value={perP}
                onClick={() => handleItemsPerPageClick(perP)}
              >
                {perP}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={TOTAL}
        perPage={perPage}
        currentItem={currentItem}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default App;
