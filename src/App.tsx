import { FC } from 'react';
import './App.css';

import { Pagination } from './components/Pagination';
import { optionsValue } from './utils/constants';
import { usePagination } from './hooks/usePagination';

export const App: FC = () => {
  const {
    total,
    onPageChange,
    itemsPerPage,
    selectedItems,
    currentPage,
    onSelectChange,
    lastItemIndex,
    firstItemIndex,
  } = usePagination();

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${currentPage} (items ${firstItemIndex + 1} - ${lastItemIndex} of ${total})`}
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={itemsPerPage}
            onChange={onSelectChange}
          >
            {optionsValue.map(itemSize => (
              <option key={itemSize} value={itemSize}>{itemSize}</option>
            ))}
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={total}
        perPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      <ul>
        {selectedItems.map(item => (
          <li key={item} data-cy="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};
