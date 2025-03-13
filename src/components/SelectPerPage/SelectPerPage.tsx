import React from 'react';
import { PerPageOptions } from '../Constants/Constants';

type Props = {
  perPage: number;
  onSelect: (newPerPage: number) => void;
};

export const SelectPerPage: React.FC<Props> = ({
  perPage,
  onSelect,
}: Props) => {
  return (
    <div className="form-group row">
      <div className="col-3 col-sm-2 col-xl-1">
        <select
          data-cy="perPageSelector"
          id="perPageSelector"
          className="form-control"
          value={perPage}
          onChange={event => onSelect(Number(event.target.value))}
        >
          {PerPageOptions.map((perPageOption: number) => (
            <option key={perPageOption} value={perPageOption}>
              {perPageOption}
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
