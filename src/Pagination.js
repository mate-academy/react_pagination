import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Pagination = ({
  total, perPage = 5, page = 1, changePage,
}) => {
  const pagesCount = Math.ceil(total / perPage);

  const ValidatePage = (event, selectedPage) => {
    event.preventDefault();

    if (selectedPage <= pagesCount && selectedPage >= 1) {
      changePage(selectedPage);
    }
  };

  const getPages = () => {
    const pages = [];

    for (let i = 1; i < pagesCount; i += 1) {
      const classes = classNames({
        'page-number': true,
        'page-number--selected': i === page,
      });

      pages.push(
        <li className={classes}>
          <a
            href="/"
            onClick={event => ValidatePage(event, i)}
          >
            {i}
          </a>
        </li>
      );
    }

    return pages;
  };

  return (
    <ul className="pagination">
      <li className="page-number">
        <a
          href="/"
          onClick={event => ValidatePage(event, page - 1)}
        >
          ←
        </a>
      </li>
      {
        useMemo(() => getPages(total, perPage), [total, perPage, page])
      }
      <li className="page-number">
        <a
          href="/"
          onClick={event => ValidatePage(event, page + 1)}
        >
          →
        </a>
      </li>
    </ul>
  );
};

export default Pagination;

Pagination.defaultProps = {
  perPage: 5,
  page: 1,
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  perPage: PropTypes.number,
  page: PropTypes.number,
};
