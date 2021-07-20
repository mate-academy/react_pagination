import React from 'react';
import PropTypes from 'prop-types';
import { Page } from '../Page/Page';

export const Pagination = ({ total, perPage, page }) => {
  const pagesCount = Math.ceil(total / perPage);
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((pageContent, i) => (
          <li
            className={`page-item ${((i + 1) === page) ? 'active' : ''}`}
            key={pageContent}
          >
            <Page content={pageContent} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number,
  page: PropTypes.number,
};

Pagination.defaultProps = {
  perPage: 5,
  page: 1,
};
