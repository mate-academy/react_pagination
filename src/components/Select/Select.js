import React from 'react';
import { SelectProps } from '../../props/SelectProps';

export const Select = ({ selectValues, onPerPageChange, perPage }) => (
  <select
    name="page"
    className="p-2 m-auto"
    value={perPage}
    onChange={({ target }) => onPerPageChange(+target.value)}
  >
    {selectValues.map(value => (
      <option
        key={value}
        value={value}
      >
        {value}
      </option>
    ))
    }
  </select>
);

Select.propTypes = SelectProps;
