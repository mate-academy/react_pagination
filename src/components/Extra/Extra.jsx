import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Extra.css';

export function Extra({ currentPage }) {
  return (
    <div className={classNames('Extra__addition', {
      'Extra__addition--active': currentPage > 5,
    })}
    >
      You have lots of opportunities to make money together with us
    </div>
  );
}

Extra.propTypes = {
  currentPage: PropTypes.number.isRequired,
};
