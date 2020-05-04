import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const PaginationItem = ({ page, activePage, text, onPageChange }) => (
  <li className={
    cn('page-item', {
      active: page === activePage,
      pagination__arrow: text,
    })}
  >
    <button
      type="button"
      className="page-link"
      onClick={() => onPageChange(page)}
    >
      {text || page}
    </button>
  </li>
);

PaginationItem.defaultProps = {
  text: '',
};

PaginationItem.propTypes = {
  page: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export default PaginationItem;
