import React from 'react';
import { SelectPerPageTypes } from './SelectPerPageTypes';

export const SelectPerPage = ({ perPage, onPerPageChange }) => (
  <>
    <p>
      Select PerPage:
      {' '}
      <select
        defaultValue={perPage}
        onChange={(event) => {
          onPerPageChange(Number(event.target.value));
        }}
      >
        <option value={3}>3</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </p>
  </>
);

SelectPerPage.propTypes = SelectPerPageTypes;
