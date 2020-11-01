import PropTypes from 'prop-types';

export const SelectProps = {
  selectValues: PropTypes.arrayOf(
    PropTypes.number.isRequired,
  ).isRequired,
  onPerPageChange: PropTypes.func.isRequired,
  perPage: PropTypes.number.isRequired,
};
