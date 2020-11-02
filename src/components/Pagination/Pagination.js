import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

const renderPaginationBtn = (onClick, page, total) => {
  const middleBtn = '&hellip;';
  const gapBtns = [page - 1, page, page + 1];

  let btns = [];

  if (page < total - 2 && page > 3) {
    btns = [1, middleBtn, ...gapBtns, middleBtn, total];
  }

  if (page >= total - 2) {
    btns = [total - 2, total - 1, total];
  }

  if (page <= 3) {
    btns = [1, 2, 3];
  }

  return (
    <ul className="pagination-list">
      {btns.map((btn) => {
        if (btn === '&hellip;') {
          return (
            <li>
              <span className="pagination-ellipsis">
                &hellip;
              </span>
            </li>
          );
        }

        return (
          <li>
            <button
              className={
                classNames('pagination-link', { 'is-current': btn === page })
              }
              type="button"
              key={btn}
              onClick={onClick}
              data-name={btn}
            >
              {btn}
            </button>
          </li>
        );
      })
      }
    </ul>
  );
};

export const Pagination = ({ onClick, page, total }) => (
  <nav
    className="pagination is-centered"
    role="navigation"
    aria-label="pagination"
  >
    {page > 3
    && (
      <button
        className="pagination-previous"
        type="button"
        onClick={onClick}
        data-name="prev"
      >
        {'<<'}
      </button>
    )}
    {renderPaginationBtn(onClick, page, total)}
    {page < total - 2
    && (
      <button
        className="pagination-next"
        type="button"
        onClick={onClick}
        data-name="next"
      >
        {'>>'}
      </button>
    )}
  </nav>
);

Pagination.propTypes = {
  onClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
