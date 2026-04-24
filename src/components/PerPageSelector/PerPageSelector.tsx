import React from 'react';

import { ItemsPerPage } from '../../types/ItemsPerPage';

type Props = {
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: ItemsPerPage) => void;
  optionsItemsPerPage: ItemsPerPage[];
};

export const PerPageSelector: React.FC<Props> = ({
  itemsPerPage,
  onItemsPerPageChange,
  optionsItemsPerPage,
}) => {
  return (
    <div className="form-group row">
      <div className="col-3 col-sm-2 col-xl-1">
        <select
          data-cy="perPageSelector"
          id="perPageSelector"
          className="form-control"
          value={itemsPerPage}
          onChange={e => {
            onItemsPerPageChange(Number(e.target.value) as ItemsPerPage);
          }}
        >
          {optionsItemsPerPage.map(option => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <label htmlFor="perPageSelector" className="col-form-label col">
        items per page
      </label>
    </div>
  );
};
