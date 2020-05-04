import React from 'react';
import PropTypes from 'prop-types';
import PaginationButton from './PaginationButton';
import './Pagination.css';

class Pagination extends React.Component {
  state = {};

  render() {
    const { total, perPage, page, onPageChange } = this.props;
    const lastPage = Math.ceil(total / perPage);

    return (
      <nav>
        <ul className="pagination">
          <PaginationButton
            page={page - 1}
            activePage={page}
            onPageChange={onPageChange}
            text="&laquo;"
          />

          {page > 2 && (
            <>
              <PaginationButton
                page={1}
                activePage={page}
                onPageChange={onPageChange}
              />
              <span className="pagination__dots">...</span>
            </>
          )}

          {page > 1 && (
            <PaginationButton
              page={page - 1}
              activePage={page}
              onPageChange={onPageChange}
            />
          )}

          <PaginationButton
            page={page}
            activePage={page}
            onPageChange={onPageChange}
          />

          {page < lastPage && (
            <PaginationButton
              page={page + 1}
              activePage={page}
              onPageChange={onPageChange}
            />
          )}

          {page < lastPage - 1 && (
            <>
              <span className="pagination__dots">...</span>
              <PaginationButton
                page={lastPage}
                activePage={page}
                onPageChange={onPageChange}
              />
            </>
          )}

          <PaginationButton
            page={page + 1}
            activePage={page}
            onPageChange={onPageChange}
            text="&raquo;"
          />
        </ul>
      </nav>
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
