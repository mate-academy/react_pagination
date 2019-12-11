import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ page,
  totalAmountOfPages,
  perPage,
  onPageChange }) => {
  const numberOfPages = [];

  for (let i = 1; i <= Math.ceil(totalAmountOfPages / perPage); i += 1) {
    numberOfPages.push(i);
  }

  const setPrevButtonToDisabled = (pageNumber) => {
    let pageClass = '';

    if (pageNumber <= 1) {
      pageClass = 'disabled';
    }

    return pageClass;
  };

  const setNextButtonToDisabled = (pageNumber) => {
    let pageClass = '';

    if (pageNumber === numberOfPages.length) {
      pageClass = 'disabled';
    }

    return pageClass;
  };

  return (
    <>
      <ul>
        <li className={setPrevButtonToDisabled(page)}>
          <button type="button" onClick={() => onPageChange(page - 1)}>
            Previous
          </button>
        </li>

        {numberOfPages.map(number => (
          <li key={number}>
            <button type="button" onClick={() => onPageChange(number)}>
              {number}
            </button>
          </li>
        ))}

        <li className={setNextButtonToDisabled(page)}>
          <button type="button" onClick={() => onPageChange(page + 1)}>
            Next
          </button>
        </li>
      </ul>
    </>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalAmountOfPages: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
  onPageChange: () => {},
};
export default Pagination;
