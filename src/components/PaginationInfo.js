import React from 'react';
import PropTypes from 'prop-types';

const PaginationInfo = ({ total, perPage, page }) => {
  const interspace = () => {
    const start = (page - 1) * perPage + 1;
    const finish = (page === Math.ceil(total / perPage))
      ? total
      : page * perPage;

    return start === finish
      ? `${start} of ${total}`
      : `${start} - ${finish} of ${total}`;
  };

  return (
    <p className="pagination__info">
      {interspace()}
    </p>
  );
};

PaginationInfo.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

export default PaginationInfo;
