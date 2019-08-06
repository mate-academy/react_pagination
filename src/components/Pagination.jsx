import React from 'react';
import PropTypes from 'prop-types';

const Pagination = (props) => {
  const {
    page,
    total,
    perPage,
    onPageChange,
  } = props;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  const getPageLinkClasses = (number) => {
    let pageLinkClass = 'page-item';

    if (number === page) {
      pageLinkClass += ' active';
    }

    return pageLinkClass;
  };

  const getPrevPageClasses = (pageNumber) => {
    let pageClass = 'page-item';

    if (pageNumber <= 1) {
      pageClass += ' disabled';
    }

    return pageClass;
  };

  const getNextPageClasses = (pageNumber) => {
    let pageClass = 'page-item';

    if (pageNumber === pageNumbers.length) {
      pageClass += ' disabled';
    }

    return pageClass;
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-start">
        <li className={getPrevPageClasses(page)}>
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            className="page-link"
            href="#"
            tabIndex="-1"
            aria-disabled="true"
          >
            Previous
          </button>
        </li>

        {pageNumbers.map(number => (
          <li key={number} className={getPageLinkClasses(number)}>
            <button
              type="button"
              onClick={() => onPageChange(number)}
              className="page-link"
              href="#"
            >
              {number}
            </button>
          </li>
        ))}

        <li className={getNextPageClasses(page)}>
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            className="page-link"
            href="#"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
  onPageChange: () => {},
};

export default Pagination;
