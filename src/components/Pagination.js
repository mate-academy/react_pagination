import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({
  posts, page, postsPerPage, totalPostsCount, handlePageChange,
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

  const startPage = (page) * postsPerPage + 1;
  const endPage = ((page + 1) * postsPerPage) < posts.length
    ? ((page + 1) * postsPerPage) : posts.length;

  return (
    <>
      <div className="page-info">
        <div className="page-info_all">{startPage}</div>
        <div className="page-info_all"> - </div>
        <div className="page-info_all">{endPage}</div>
        <div className="page-info_all"> of </div>
        <div className="page-info_all">{posts.length}</div>
      </div>
      <div className="pagination">
        <div className="page-item">
          <button
            type="button"
            className="page-link"
            onClick={() => handlePageChange(0)}
            disabled={(page) === 0}
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
            disabled={(page) === (postsPerPage - 1)}
          >
            Last Page
          </button>
        </div>
      </div>
    </>
  );
};

Pagination.propTypes = {
  posts: PropTypes.objectOf.isRequired,
  page: PropTypes.number.isRequired,
  postsPerPage: PropTypes.number.isRequired,
  totalPostsCount: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
