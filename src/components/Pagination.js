import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Pagination = ({
  totalPosts,
  postsPerPage,
  currentPage,
  changePage,
}) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button
            id="prev"
            type="button"
            className="page-link"
            href="#"
            onClick={changePage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {pages.map(page => (
          <li
            key={page}
            className={(classNames({
              'page-item': true,
              active: page === currentPage,
            }))}
            onClick={changePage}
          >
            <a
              id={page}
              className="page-link"
              href={`#${page}`}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          id={pages[pages.length - 1]}
          className="page-item"
        >
          <button
            id="next"
            type="button"
            className="page-link"
            href="#"
            onClick={changePage}
            disabled={currentPage === pages[pages.length - 1]}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalPosts: PropTypes.number.isRequired,
  postsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};
