import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import './Pagination.css';

class Pagination extends PureComponent {
  render() {
    const { total, perPage, page, onPageChange } = this.props;
    const pagesCount = Math.ceil(total / perPage);

    return (
      <div className="pagination">
        <button
          onClick={() => onPageChange(page - 1)}
          className="pagination__button"
          type="button"
          disabled={page === 1}
        >
          &lt;
        </button>
        {[...Array(pagesCount)].map((e, index) => (
          <button
            key={uuidv4()}
            className={
              index + 1 === page
                ? 'pagination__button pagination__button--selected'
                : 'pagination__button'}
            type="button"
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(page + 1)}
          className="pagination__button"
          type="button"
          disabled={page === pagesCount}
        >
          &gt;
        </button>
      </div>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
