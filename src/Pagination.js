import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Pagination = (
  { total,
    perPage,
    page,
    pageChange,
    perPageChange,
    info },
) => {
  const firstVisibleId = (page - 1) * perPage + 1;
  const lastVisibleId = (firstVisibleId + perPage - 1) > total
    ? total
    : firstVisibleId + perPage - 1;
  const lastPage = Math.ceil(total / perPage);
  const pageMinusTwoTrigger = (page === lastPage && perPage < total);
  const pagePlusTwoTrigger = (lastPage < 3 || page + 1 >= lastPage);
  const content = [...Array(total)]
    .map((_, i) => ({
      id: i + 1,
      text: 'Some text',
    }));

  return (
    <div className="wrapper">
      <select
        name="perPage"
        value={perPage}
        onChange={perPageChange}
        className="page-selector"
      >
        <option value={3}>
          3
        </option>
        <option value={5}>
          5
        </option>
        <option value={10}>
          10
        </option>
        <option value={20}>
          20
        </option>
      </select>
      <ul>
        {content.filter(item => item.id >= firstVisibleId
        && item.id <= lastVisibleId)
          .map(item => (
            <li key={item.id} className="li">
              {item.id}
              {'. '}
              {item.text}
            </li>
          ))}
      </ul>

      { info && (
        <p className="page-info">
          {`${firstVisibleId} - ${lastVisibleId} of ${total}`}
        </p>
      )}

      <ul className="pagination">
        <li className="page-item">
          <button
            type="button"
            onClick={() => pageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
        </li>
        <li className="page-item">
          { pageMinusTwoTrigger && (
            <button
              type="button"
              onClick={() => pageChange(lastPage - 2)}
              className={classNames('page-link', {
                invisible: lastPage - 2 === 0,
              })}
            >
              {lastPage - 2}
            </button>
          )}
        </li>
        <li className="page-item">
          <button
            type="button"
            className={classNames('page-link', {
              invisible: page === 1,
            })}
            onClick={() => pageChange(page - 1)}
          >
            {page - 1}
          </button>
        </li>
        <li className="page-item">
          <button
            type="button"
            className="page-link current"
            onClick={() => pageChange(page)}
          >
            {page}
          </button>
        </li>
        <li className="page-item">
          { page === lastPage || (
            <button
              type="button"
              onClick={() => pageChange(page + 1)}
            >
              {page + 1}
            </button>
          )}
        </li>
        <li className="page-item">
          {pagePlusTwoTrigger || (
            <button
              type="button"
              onClick={() => pageChange(page + 2)}
            >
              {page + 2}
            </button>
          )}
        </li>
        <li className="page-item">
          <button
            type="button"
            onClick={() => pageChange(page + 1)}
            disabled={page === lastPage}
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
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  pageChange: PropTypes.func.isRequired,
  perPageChange: PropTypes.func.isRequired,
  info: PropTypes.bool.isRequired,
};
