import React from 'react';
import { PER_PAGE_VALUES } from '../../constants';

type Props = {
  perPage: number;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const PerPageSelector: React.FC<Props> = ({
  perPage,
  handleChange,
}) => (
  <div className="form-group row">
    <div className="col-3 col-sm-2 col-xl-1">
      <select
        data-cy="perPageSelector"
        id="perPageSelector"
        className="form-control"
        defaultValue={perPage}
        onChange={handleChange}
      >
        {PER_PAGE_VALUES.map(element => (
          <option value={element} key={`#${element}`}>{element}</option>
        ))}
      </select>
    </div>

    <label htmlFor="perPageSelector" className="col-form-label col">
      items per page
    </label>
  </div>
);
