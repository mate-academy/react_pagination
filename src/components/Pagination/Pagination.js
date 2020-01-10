import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

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
      <ul className="button-list">
        <li className={setPrevButtonToDisabled(page)}>
          <Button
            basic
            color="blue"
            size="mini"
            content="Previous"
            onClick={() => onPageChange(page - 1)}
          />
        </li>

        {numberOfPages.map(number => (
          <li key={number}>
            <Button
              basic
              color="yellow"
              size="mini"
              content={number}
              onClick={() => onPageChange(number)}
            />
          </li>
        ))}

        <li className={setNextButtonToDisabled(page)}>
          <Button
            basic
            color="blue"
            size="mini"
            content="Next"
            onClick={() => onPageChange(page + 1)}
          />
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
