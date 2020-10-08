import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';
import classNames from 'classnames';

export const Pagination = ({
  total,
  perPage,
  page,
  previousPage,
  onPageChange,
  nextPage,
}) => {
  const firstPage = 1;
  const lastPage = Math.ceil(total / perPage);
  const precurrent = page - 1;
  const postcurrent = page + 1;
  const skipPages = '...';
  const startNumberInPerPage = page * perPage - perPage + 1;
  const finalNumberInPerPage = page * perPage > total ? total : page * perPage;
  let arrayOfPagination = [];

  if (lastPage < 4) {
    for (let i = firstPage; i <= lastPage; i += 1) {
      arrayOfPagination.push(i);
    }
  } else if (page === firstPage) {
    arrayOfPagination = [page, postcurrent, skipPages, lastPage];
  } else if (precurrent === firstPage && postcurrent + 1 === lastPage) {
    arrayOfPagination = [firstPage, page, postcurrent, lastPage];
  } else if (precurrent === firstPage && postcurrent + 1 !== lastPage) {
    arrayOfPagination = [firstPage, page, postcurrent, skipPages, lastPage];
  } else if (precurrent === firstPage + 1 && postcurrent + 1 === lastPage) {
    arrayOfPagination = [firstPage, precurrent, page, postcurrent, lastPage];
  } else if (precurrent === firstPage + 1 && postcurrent + 1 !== lastPage) {
    arrayOfPagination = [firstPage, precurrent,
      page, postcurrent, skipPages, lastPage];
  } else if (postcurrent + 1 === lastPage) {
    arrayOfPagination = [firstPage, skipPages,
      precurrent, page, postcurrent, lastPage];
  } else if (postcurrent === lastPage) {
    arrayOfPagination = [firstPage, skipPages, precurrent, page, postcurrent];
  } else if (page === lastPage) {
    arrayOfPagination = [firstPage, skipPages, precurrent, page];
  } else if (postcurrent + 1 !== lastPage) {
    arrayOfPagination = [firstPage, skipPages,
      precurrent, page, postcurrent, skipPages, lastPage];
  }

  return (
    <>
      <p>{`${startNumberInPerPage}-${finalNumberInPerPage} of ${total}`}</p>
      <div className="pagination">
        <button
          type="button"
          className="previousButton"
          disabled={page === firstPage}
          onClick={previousPage}
        >
          Previous
        </button>
        {arrayOfPagination.map(numberOfPage => (
          <button
            type="button"
            className={classNames(
              'page',
              { active: page === numberOfPage },
            )}
            disabled={skipPages === numberOfPage}
            name={numberOfPage}
            value={numberOfPage}
            onClick={() => onPageChange(numberOfPage)}
          >
            {numberOfPage}
          </button>
        ))}
        <button
          type="button"
          className="nextButton"
          disabled={page === lastPage}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  previousPage: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
};
