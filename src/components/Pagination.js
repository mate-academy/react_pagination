import React from 'react';
import PropTypes from 'prop-types';
import PaginationInfo from './PaginationInfo';

const Pagination = ({ total, perPage, page, handleChange }) => {
  const pages = [...Array(Math.ceil(total / perPage)).keys()];

  return (
    <nav>
      <ul className="pagination">
        <PaginationInfo
          total={total}
          perPage={perPage}
          page={page}
        />
        <li className="pagination__item">
          <button
            type="button"
            className={page - 1
              ? 'pagination__link'
              : 'pagination__link pagination__link--unactive'
            }
            onClick={() => {
              (page - 1) && handleChange(page - 1);
            }}
          >
            Previous
          </button>
        </li>

        {pages.map(currentPage => (
          <li key={currentPage} className="pagination__item">
            <button
              type="button"
              className={currentPage + 1 === page
                ? 'pagination__link pagination__link--current'
                : 'pagination__link'
              }
              onClick={() => handleChange(currentPage + 1)}
            >
              {currentPage + 1}
            </button>
          </li>
        ))}

        <li className="pagination__item">
          <button
            type="button"
            className={page + 1 <= pages.length
              ? 'pagination__link'
              : 'pagination__link pagination__link--unactive'
            }
            onClick={() => {
              (page + 1 <= pages.length) && handleChange(page + 1);
            }}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Pagination;
