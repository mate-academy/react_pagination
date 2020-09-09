import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Content } from './Content';

export const Pagination = (
  { total,
    perPage,
    page,
    pageChange,
    perPageChange,
    info },
) => {
  const lastPage = Math.ceil(total / perPage);
  const firstPageTrigger = (page === 1 || page === 2);
  const lastPageTrigger = (page === lastPage || page === lastPage - 1);

  return (
    <div className="wrapper">
      <Content
        total={total}
        perPage={perPage}
        page={page}
        perPageChange={perPageChange}
        info={info}
      />

      <ul className="pagination">
        <li className="page-item">
          <button
            type="button"
            onClick={() => pageChange(page - 1)}
            disabled={page === 1}
          >
            {'<'}
          </button>
        </li>
        <li className="page-item">
          { firstPageTrigger || (
            <button
              type="button"
              onClick={() => pageChange(1)}
            >
              {1}
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
          { lastPageTrigger || (
            <button
              type="button"
              onClick={() => pageChange(lastPage)}
            >
              {lastPage}
            </button>
          )}
        </li>
        <li className="page-item">
          <button
            type="button"
            onClick={() => pageChange(page + 1)}
            disabled={page === lastPage}
          >
            {'>'}
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
