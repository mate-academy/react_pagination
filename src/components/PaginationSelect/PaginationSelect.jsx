import React from 'react';
import PropTypes, { number } from 'prop-types';

export const PaginationSelect = ({ selectId, range, value, action }) => (
  <select
    className="form-select"
    aria-label="Default select example"
    id={selectId}
    onChange={action}
    value={value}
  >
    {range.map(element => (
      <option key={Math.random()} value={element}>{element}</option>
    ))}
  </select>
);

PaginationSelect.propTypes = {
  selectId: PropTypes.string.isRequired,
  range: PropTypes.arrayOf(number).isRequired,
  value: PropTypes.number.isRequired,
  action: PropTypes.func.isRequired,
};
