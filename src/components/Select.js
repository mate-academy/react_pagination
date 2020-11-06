import React from 'react';
import PropTypes from 'prop-types';

export const Select = ({ onChange }) => (
  <select onChange={onChange}>
    <option>3</option>
    <option>5</option>
    <option>10</option>
    <option>20</option>
  </select>
);

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
};
