import React from 'react';
import PropTypes from 'prop-types';

export const Select = ({
  option,
  options,
  onOptionChanged,
  name,
  id,
}) => (
  <select
    name={name}
    id={id}
    value={option}
    onChange={({ target }) => {
      onOptionChanged(+target.value);
    }}
  >
    {options.map(selectOption => (
      <option
        value={selectOption}
        key={selectOption}
      >
        {selectOption}
      </option>
    ))}
  </select>
);

Select.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  option: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  onOptionChanged: PropTypes.func.isRequired,
};
