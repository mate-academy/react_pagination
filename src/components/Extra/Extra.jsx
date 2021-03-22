import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Extra.css';

export function Extra({ currentPage }) {
  const advertisingFromPage = 5;

  return (
    <div className={classNames('extra__addition', {
      'extra__addition--active': currentPage > advertisingFromPage,
    })}
    >
      You have lots of opportunities to make money together with us
    </div>
  );
}

Extra.propTypes = {
  currentPage: PropTypes.number.isRequired,
};
