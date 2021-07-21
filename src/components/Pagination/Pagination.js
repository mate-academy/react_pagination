import React from 'react';
import PropTypes from 'prop-types';
import { Page } from '../Page/Page';

export const Pagination = ({
  total,
  perPage,
  page,
  onPageChanged,
  onPerPageChanged,
  withInfo,
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  const perPageOptions = Array.from({ length: total }, (_, i) => i + 1);
  const extraInfo = withInfo
    ? (
      <p>
        {`${(perPage * page - perPage + 1)} - ${(perPage * page > total
          ? total
          : perPage * page)} of ${total}`}
      </p>
    )
    : '';

  return (
    <>
      <select
        name="perPageSelect"
        id="perPageSelect"
        value={perPage}
        onChange={({ target }) => {
          onPerPageChanged(target.value);
        }}
      >
        {perPageOptions.map(perPageOption => (
          <option
            value={perPageOption}
            key={perPageOption}
          >
            {perPageOption}
          </option>
        ))}
      </select>
      {extraInfo}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li
            className={`page-item ${page === 1 ? 'disabled' : ''}`}
            key="previous"
          >
            <Page
              content="previous"
              onPageChanged={onPageChanged}
              page={page}
            />
          </li>
          {pages.map((pageContent, i) => (
            <li
              className={`page-item ${((i + 1) === page) ? 'active' : ''}`}
              key={pageContent}
            >
              <Page
                content={pageContent.toString()}
                onPageChanged={onPageChanged}
                page={page}
              />
            </li>
          ))}
          <li
            className={`page-item ${page === pagesCount
              ? 'disabled'
              : ''}`}
            key="next"
          >
            <Page
              content="next"
              onPageChanged={onPageChanged}
              page={page}
            />
          </li>
        </ul>
      </nav>
    </>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number,
  page: PropTypes.number,
  withInfo: PropTypes.bool,
  onPageChanged: PropTypes.func.isRequired,
  onPerPageChanged: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  perPage: 5,
  page: 1,
  withInfo: false,
};
