import React from 'react';
import { Dropdown } from './../../types/dropdown';

const options = [3, 5, 10, 20];

export const DropdownOption = ({ value, onChange }: Dropdown) => {
  return (
    <div className="col-3 col-sm-2 col-xl-1">
      <select
        data-cy="perPageSelector"
        id="perPageSelector"
        className="form-control"
        value={value}
        onChange={event => onChange(+event.target.value)}
      >
        {options.map(option => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
