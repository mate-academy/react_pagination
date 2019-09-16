import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const Pagination = ({
  total,
  totalItems,
  perPage = 5,
  page = 1,
  onPageChange,
  withInfo,
  showFrom,
  showTo,
  posts,
}) => (
  <>
    <h1>Pagination component</h1>
    <ul>
      {posts.slice((perPage * (page - 1)), (perPage * page)).map(post =>
        <li key={post.id}>
          <span>{post.id} </span>
          <span>{post.title}</span>
        </li>
      )}
    </ul>
    <div>
    {withInfo ? `${showFrom} - ${showTo} of ${totalItems}` : ''}
    </div>
    <button
      type="button"
      disabled={page === 1}
      onClick={() => onPageChange(page - 1)}
    >
      Prev
    </button>
    {(Array.from(Array(total), (v, k) => k + 1)).map(item =>
      <button
        type="button"
        key={item}
        className={classNames({
          'active': item === page,
        })}
        onClick={() => onPageChange(item)}
      >
        {item}
      </button>
    )}
    <button
      type="button"
      disabled={page === total}
      onClick={() => onPageChange(page + 1)}
    >
      Next
    </button>
  </>
);

Pagination.propTypes = {
  total: PropTypes.number,
  totalItems: PropTypes.number,
  perPage: PropTypes.number,
  page: PropTypes.number,
  onPageChange: PropTypes.func,
  withInfo: PropTypes.bool,
  showFrom: PropTypes.number,
  showTo: PropTypes.number,
  posts: PropTypes.array,
};

export default Pagination;
