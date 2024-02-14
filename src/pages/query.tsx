import React, { useState } from 'react';
import {
  useSearchParams,
} from 'react-router-dom';

import { Pagination } from '../components/Pagination';

const totalItems = 42;
const showOptions = [3, 5, 10, 20];

export const Query: React.FC = () => {
  const [searchParams] = useSearchParams();

  const castomPage = searchParams.get('page') || 1;
  const castomItemsShow = searchParams.get('perPage') || 5;
  const checkedCastomPage
    = +castomPage > Math.ceil(totalItems / +castomItemsShow)
      ? Math.ceil(totalItems / +castomItemsShow)
      : castomPage;

  if (!showOptions.includes(+castomItemsShow)) {
    showOptions.push(+castomItemsShow);
    showOptions.sort((a, b) => a - b);
  }

  const [showItems, setShowItems] = useState(+castomItemsShow);
  const [currentPage, setCurrentPage] = useState(+checkedCastomPage);

  const fromItem = currentPage * showItems - showItems + 1;
  const toItem = (currentPage * showItems) > totalItems
    ? totalItems
    : currentPage * showItems;

  const handleItemsSelector = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShowItems(+event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="container">
        <h1>Items with Pagination</h1>

        <p className="lead" data-cy="info">
          {`Page ${currentPage} (items ${fromItem} - ${toItem} of ${totalItems})`}
        </p>

        <div className="form-group row">
          <div className="col-3 col-sm-2 col-xl-1">
            <select
              data-cy="perPageSelector"
              id="perPageSelector"
              className="form-control"
              onChange={handleItemsSelector}
              defaultValue={showItems}
            >
              {showOptions
                .map(option => (
                  <option
                    value={option}
                    key={option}
                  >
                    {option}
                  </option>
                ))}
            </select>
          </div>

          <label htmlFor="perPageSelector" className="col-form-label col">
            items per page
          </label>
        </div>

        <Pagination
          totalItems={totalItems}
          perPage={showItems}
          currentPage={currentPage}
          onPageChange={(value: number) => setCurrentPage(value)}
        />
      </div>
    </>
  );
};

export default Query;
