import React from 'react';
import PropTypes from 'prop-types';

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

Select.propTypes = {
  selectValues: PropTypes.arrayOf(
    PropTypes.number.isRequired,
  ).isRequired,
  onPerPageChange: PropTypes.func.isRequired,
  perPage: PropTypes.number.isRequired,
};
