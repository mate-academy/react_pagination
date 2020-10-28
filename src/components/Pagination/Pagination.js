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

  const getPaginationControlsInMoreThan5Pages = () => {
    if (page < firstPage + 2) {
      arrayOfPagination = [firstPage, firstPage + 1,
        firstPage + 2, skipPages, lastPage];
    }

    if (page > lastPage - 2) {
      arrayOfPagination = [firstPage, skipPages,
        lastPage - 2, lastPage - 1, lastPage];
    }

    if (page > firstPage + 1 && page < lastPage - 1) {
      arrayOfPagination = [firstPage, skipPages, precurrent,
        page, postcurrent, skipPages, lastPage];

      if (lastPage - 2 === firstPage + 2) {
        arrayOfPagination = arrayOfPagination
          .filter(numberOfPage => numberOfPage !== '...');
      } else if (page === firstPage + 2) {
        arrayOfPagination.splice(1, 1);
      } else if (page === lastPage - 2) {
        arrayOfPagination.splice(5, 1);
      }
    }

    return arrayOfPagination;
  };

  const getPaginationControls = () => {
    if (lastPage < 5) {
      for (let i = firstPage; i <= lastPage; i += 1) {
        arrayOfPagination.push(i);
      }
    } else {
      getPaginationControlsInMoreThan5Pages();
    }
  };

  getPaginationControls();

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
            key={numberOfPage}
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
