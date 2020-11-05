import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { Button } from './Button';

const classNames = require('classnames');

export const Pagination = ({
  totalAmountOfItems,
  perPage,
  pageSelected,
  onPageChange,
  clickNext,
  clickPrevious,
  withInfo,
}) => {
  const pagesAmount = Math.ceil(totalAmountOfItems / perPage);

  const pages = new Array(pagesAmount).fill({}).map((page, index) => ({
    ...page,
    key: uuidv4(),
    pageNumber: index + 1,
  }));

  return (
    <nav className="pagination">
      {withInfo && (
        <div className="info">
          {(pageSelected - 1) * perPage + 1}
          {' - '}
          {(pageSelected) * perPage}
          {' of '}
          {totalAmountOfItems}
        </div>
      )}
      <ul className="pagination justify-content-center">
        <Button
          disableIf={pageSelected === 1}
          text="Previous"
          onClick={clickPrevious}
        />
        {pages.map(page => (
          <li
            key={page.key}
            className={classNames({
              'page-item': true,
              active: page.pageNumber === pageSelected,
            })}
          >
            <button
              type="button"
              className="page-link"
              onClick={event => onPageChange(+event.target.textContent)}
            >
              {page.pageNumber}
            </button>
          </li>
        ))}
        <Button
          disableIf={pageSelected === pagesAmount}
          text="Next"
          onClick={clickNext}
        />
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalAmountOfItems: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  pageSelected: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  clickNext: PropTypes.func.isRequired,
  clickPrevious: PropTypes.func.isRequired,
  withInfo: PropTypes.bool,
};

Pagination.defaultProps = {
  withInfo: 'false',
};
