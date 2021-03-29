import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const Pagination = ({
  total,
  perPage,
  activePage,
  perPagesList,
  onNext,
  onPrevious,
  onPageChange,
  onChangePerPage,
}) => {
  const onPerPageChangeHandler = (event) => {
    if (event.target.value !== perPage) {
      onChangePerPage(event);
    }
  };

  const onNextHandler = (event) => {
    event.preventDefault();

    if (activePage < pagesCount) {
      onNext(event);
    }
  };

  const onPreviousHandler = (event) => {
    event.preventDefault();

    if (activePage > 1) {
      onPrevious(event);
    }
  };

  const onPageChangeHandler = (event, page) => {
    event.preventDefault();

    if (page !== activePage) {
      onPageChange(page);
    }
  };

  const pagesCount = Math.ceil(total / perPage);
  const maxCountItems = activePage === pagesCount
    ? total
    : activePage * perPage;

  return (
    <>
      <nav
        className="pagination"
        role="navigation"
      >
        <div className="select">
          <select
            value={perPage}
            onChange={onPerPageChangeHandler}
          >
            {perPagesList.map(page => (
              <option key={page}>
                {page}
              </option>
            ))}
          </select>
        </div>
        <a
          href="/"
          className="pagination-previous"
          onClick={onPreviousHandler}
          disabled={activePage === 1}
        >
          Previous
        </a>
        <a
          href="/"
          className="pagination-next"
          onClick={onNextHandler}
          disabled={activePage === pagesCount}
        >
          Next page
        </a>
        <ul className="pagination-list">
          {Array.from(new Array(pagesCount)).map((_, pageIndex) => (
            <li key={`page-${pageIndex + 1}`}>
              <a
                href="/"
                className={classNames(
                  'pagination-link',
                  { 'is-current': pageIndex + 1 === activePage },
                )}
                onClick={event => onPageChangeHandler(event, pageIndex + 1)}
              >
                {pageIndex + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span>
        {(activePage - 1) * perPage + 1}
        {' '}
        -
        {maxCountItems}
        {' '}
        of
        {total}
      </span>
    </>
  );
};

Pagination.defaultProps = {
  perPage: 5,
  activePage: 1,
  perPagesList: [3, 5, 10, 20],
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number,
  activePage: PropTypes.number,
  perPagesList: PropTypes.arrayOf(PropTypes.number),
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onChangePerPage: PropTypes.func.isRequired,
};
