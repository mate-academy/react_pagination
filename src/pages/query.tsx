import React, {
  useState,
  useEffect,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import { Pagination } from '../components/Pagination';

const totalItems = 42;
const showOptions = [3, 5, 10, 20];

export const Query: React.FC = () => {
  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    setSearch({ page: '2', perPage: '7' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customPage = search.get('page') || 1;
  const castomItemsShow = search.get('perPage') || 5;
  const checkedCastomPage
    = +customPage > Math.ceil(totalItems / +castomItemsShow)
      ? Math.ceil(totalItems / +castomItemsShow)
      : customPage;

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
          fromItem={fromItem}
          toItem={toItem}
          onPageChange={(value: number, range: number) => {
            if (value > 0 && value <= range) {
              setCurrentPage(value);
            }
          }}
        />
      </div>
    </>
  );
};
