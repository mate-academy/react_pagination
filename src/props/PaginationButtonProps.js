import PropTypes from 'prop-types';

export const PaginationButtonProps = {
  simbol: PropTypes.string,
  page: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
