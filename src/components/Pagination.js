import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Pagination = ({
  total, page, perPage, posts, onPageChange, onPerPageChange,
}) => {
  const lastIndex = page * perPage;
  const startIndex = lastIndex - perPage;
  const amountOfItems = posts.length;
  const handlePerPageChange = (event) => {
    onPerPageChange(+event.target.value);
  };

  return (
    <>
      <ul className="pagination_list">
        {posts.slice(startIndex, lastIndex).map(item => (
          <li key={item.id}>
            {item.title}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>
      {Array.from(Array(total)).map((item, index) => (
        <button
          type="button"
          className={classNames('button',
            { button_active: page === index + 1 })}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        type="button"
        className="button"
        disabled={page === amountOfItems / perPage}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
      <select
        className="pagination_select"
        onChange={handlePerPageChange}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      <p>{`${startIndex + 1} - ${lastIndex} of ${amountOfItems}`}</p>
    </>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPerPageChange: PropTypes.func.isRequired,
};

export default Pagination;
