import React from 'react';
import PropTypes from 'prop-types';

const posts = [5, 10, 15, 25];

export const SelectSettings = ({ changeSetting }) => (
  <select
    onChange={changeSetting}
    className="settings-select"
  >
    <option value="" hidden>select post per page</option>
    {posts.map(value => (
      <option key={value} value={value}>
        {value}
        {' '}
        posts per page
      </option>
    ))}
  </select>
);

SelectSettings.propTypes = {
  changeSetting: PropTypes.func.isRequired,
};
