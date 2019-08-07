import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({
  page, postsPerPage, totalPostsCount, handlePageChange,
}) => {
  const pageButtons = () => {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(totalPostsCount / postsPerPage); i += 1) {
      pageNumbers.push(i);
    }

    return pageNumbers.map(num => (
      <div className={page === num ? 'page-item active' : 'page-item'}>
        <button
          type="button"
          key={num}
          onClick={() => handlePageChange(num)}
          className="page-link"
        >
          {num + 1}
        </button>
      </div>
    ));
  };

  return (
    <div className="pagination">
      <div className="page-item">
        <button
          type="button"
          className="page-link"
          onClick={() => handlePageChange(0)}
        >
          First Page
        </button>
      </div>
      <div className="page-item">
        <button
          type="button"
          className="page-link"
          onClick={() => handlePageChange(page - 1)}
          disabled={(page) === 0}
        >
          Prev
        </button>
      </div>
      {pageButtons(handlePageChange, postsPerPage)}
      <div className="page-item">
        <button
          type="button"
          className="page-link"
          onClick={() => handlePageChange(page + 1)}
          disabled={(page) === (postsPerPage - 1)}
        >
          Next
        </button>
      </div>
      <div className="page-item">
        <button
          type="button"
          className="page-link"
          onClick={() => handlePageChange(postsPerPage - 1)}
        >
          Last Page
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  postsPerPage: PropTypes.number.isRequired,
  totalPostsCount: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
