import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

export const Pagination = ({
  total,
  perPage,
  page,
  onPageChange,
  showInfo,
  withInfo,
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const pages = [...Array(pagesCount).keys()].map(i => i + 1);

  return (
    <div>
      {withInfo && (
        <p>{showInfo()}</p>
      )}

      <ul className="pagination">
        <li
          className={ClassNames('page-item', {
            disabled: page === 1,
          })}
        >
          <button
            type="button"
            className="page-link"
            onClick={() => (
              onPageChange(page - 1)
            )}
            disabled={page === 1}
          >
            Previous
          </button>
        </li>

        {pages.map(currentPage => (
          <li
            className={ClassNames('page-item', {
              active: currentPage === page,
            })}
            key={currentPage}
          >
            <button
              type="button"
              className="page-link"
              onClick={() => (
                onPageChange(currentPage)
              )}
            >
              {currentPage}
            </button>
          </li>
        ))}

        <li
          className={ClassNames('page-item', {
            disabled: page === pagesCount,
          })}
        >
          <button
            type="button"
            className="page-link"
            onClick={() => (
              onPageChange(page + 1)
            )}
            disabled={page === pagesCount}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number,
  page: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  showInfo: PropTypes.func,
  withInfo: PropTypes.bool,
};

Pagination.defaultProps = {
  perPage: 5,
  page: 1,
  showInfo: () => {},
  withInfo: false,
};
