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
    let pagesTemplate;

    if (page > pagesCount - 4) {
      // eslint-disable-next-line max-len
      pagesTemplate = [1, '...', pagesCount - 4, pagesCount - 3, pagesCount - 2, pagesCount - 1, pagesCount];
    } else if (page < 4) {
      pagesTemplate = [1, 2, 3, 4, 5, '...', pagesCount];
    } else if (page >= 4 && page <= pagesCount <= pagesCount - 4) {
      pagesTemplate = [1, '...', page - 1, page, page + 1, '...', pagesCount];
    }

    pagesTemplate.forEach((pageNum) => {
      const classes = classNames({
        'page-number': true,
        'page-number--selected': pageNum === page,
      });

      pages.push(
        <li
          key={pageNum}
          className={classes}
        >
          <a href="/" onClick={event => ValidatePage(event, pageNum)}>
            {pageNum}
          </a>
        </li>
      );
    });

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
  perPage: 10,
  page: 1,
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  perPage: PropTypes.number,
  page: PropTypes.number,
};
