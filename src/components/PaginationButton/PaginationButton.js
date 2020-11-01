import React from 'react';
import { PaginationButtonProps } from '../../props/PaginationButtonProps';

export const PaginationButton = ({ simbol, page, onPageChange }) => (
  <button
    type="button"
    className="page-link"
    onClick={(event) => {
      event.preventDefault();

      onPageChange(+page);
    }}
  >
    <span aria-hidden="true">{simbol || page}</span>
  </button>
);

PaginationButton.propTypes = PaginationButtonProps;

PaginationButton.defaultProps = {
  simbol: '',
};
