import React from 'react';
import PropTypes from 'prop-types';

const classNames = require('classnames');

const Pagination = ({
  numberOfItems,
  itemsPerPage,
  currentPage,
  changeCurrentPage,
  changeToPrevOrNextPage,
  isAdditionalInfo,
  isChangedView,
}) => {
  const navArray = Array(Math.ceil(numberOfItems / itemsPerPage)).fill('index');

  return (
    <nav aria-label="Page navigation example" className="mt-3 center">
      <ul className="pagination">
        <li
          className={classNames({
            'page-item': true,
            pointer: currentPage !== 1,
            disabled: currentPage === 1,
          })}
        >
          <a
            className="page-link"
            href="/"
            name="prev-page"
            onClick={(e) => {
              const { name } = e.target;

              if (currentPage !== 1) {
                changeToPrevOrNextPage(e, name);
              }
            }}
          >
            Previous
          </a>
        </li>
        {navArray.map((elem, i) => ((((
          isChangedView
            && (
              i + 1 === 1
                || i + 1 === currentPage - 1
                || i + 1 === currentPage
                || i + 1 === currentPage + 1
                || i + 1 === navArray.length
            )
        ) || !isChangedView)
        && (
          <li
            className={
              classNames({
                'page-item': true,
                active: currentPage === i + 1,
              })}
            name={i + 1}
            key={`${elem}-${i}`}
          >
            <a
              className="page-link"
              href="/"
              name={i + 1}
              onClick={e => changeCurrentPage(e)}
            >
              {i + 1}
            </a>
            {isAdditionalInfo && (
              <span className="additional-info">
                {`${(i + 1) * itemsPerPage - itemsPerPage}-${
                  numberOfItems > (i + 1) * itemsPerPage
                    ? (i + 1) * itemsPerPage
                    : numberOfItems
                }`}
              </span>
            )}
          </li>
        )))).map((elem, i, arr) => {
          if (elem) {
            return elem;
          }

          if (!elem && arr[i + 1]) {
            return '🔵🔵🔵';
          }
        })}
        <li
          className={classNames({
            'page-item': true,
            pointer: currentPage !== navArray.length,
            disabled: currentPage === navArray.length,
          })}
        >
          <a
            className="page-link"
            href="/"
            name="next-page"
            onClick={(e) => {
              const { name } = e.target;

              if (currentPage !== navArray.length) {
                changeToPrevOrNextPage(e, name);
              }
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  numberOfItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  changeCurrentPage: PropTypes.func.isRequired,
  changeToPrevOrNextPage: PropTypes.func.isRequired,
  isAdditionalInfo: PropTypes.bool.isRequired,
  isChangedView: PropTypes.bool.isRequired,
};

export default Pagination;
