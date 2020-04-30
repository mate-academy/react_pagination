import React from 'react';
// import PropTypes, { number } from 'prop-types';

const choosePerPage = [5, 10, 15, 20];

const Select = ({ perPage, changePerPage }) => (
  <select
    value={perPage}
    onChange={event => changePerPage(event)}
    className="select"
  >
    {choosePerPage.map(page => (
      <option value={page} key={page}>
        {page}
      </option>
    ))}
  </select>
);

// Select.propTypes = {
//   perPage: PropTypes.number.isRequired,
//   changePerPage: PropTypes.func.isRequired,
//   choosePerPage: PropTypes.arrayOf(number).isRequired,
// };

export default Select;
