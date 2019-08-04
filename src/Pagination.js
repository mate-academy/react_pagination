import React from 'react';
import PropTypes from 'prop-types';

const Pagination = (props) => {
  const {
    handlePageChange,
    page,
    total,
    perPage,
        } = props;

  const lastPage = Math.ceil(total/perPage);
  const paginationBtns = (handlePageChange, lastPage) => {
    let btnsArr = [];
    for (let i = 0; i < lastPage; i++) {
      btnsArr.push(i);
    };
    return btnsArr.map((num, index) => (
      <button
        key={index}
        onClick={() => handlePageChange(num)}
        className={page === num ? 'active' : ''}
      >
        {num+1}
      </button>
    ));
  };

  return (
    <div>
      { page !== 0 && <button onClick={() => handlePageChange(0)}>{'first'}</button> }
      { page !== 0 && <button onClick={() => handlePageChange(page-1)}>{'<'}</button> }

      {paginationBtns(handlePageChange, lastPage) }

      { page !== lastPage-1 && <button onClick={() => handlePageChange(page+1)}>{'>'}</button> }
      { page !== lastPage-1 && <button onClick={() => handlePageChange(lastPage-1)}>{'last'}</button> }

    </div>
  )
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
