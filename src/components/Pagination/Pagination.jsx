import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Pagination = ({
  total,
  perPage,
  page,
  inPageChange,
  prevPage,
  nextPage,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from(Array(totalPages), (_, index) => index + 1);

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a
              onClick={prevPage}
              className={classNames('page-link-btn', {
                disabled: page === 1,
              })}
              href={`#${page}`}
            >
              Previous
            </a>
          </li>
          {pages.map(pageItem => (
            <li key={pageItem} className="page-item">
              <a
                onClick={inPageChange}
                className={classNames('page-link', {
                  active: page === pageItem,
                })}
                value={pageItem}
                href={`#${pageItem}`}
              >
                {pageItem}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              onClick={nextPage}
              className={classNames('page-link-btn', {
                disabled: page === totalPages,
              })}
              href={`#${page}`}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
      {page > perPage && (
        <p>u can take some info from this small paragraph</p>
      )}
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  inPageChange: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
};
