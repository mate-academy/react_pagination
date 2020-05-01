import React from 'react';

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

export default Select;
