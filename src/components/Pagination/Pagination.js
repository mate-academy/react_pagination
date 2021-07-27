import React from 'react';
import PropTypes from 'prop-types';
import { Page } from '../Page/Page';
import { Select } from '../Select/Select';

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
  const selectedPage = (page > pagesCount || page < 1) ? 1 : page;
  const extraInfo = withInfo
    ? (
      <p>
        {`${(perPage * selectedPage - perPage + 1)} -
        ${(perPage * selectedPage > total
          ? total
          : perPage * selectedPage)} of ${total}`}
      </p>
    )
    : '';

  return (
    <>
      <Select
        options={perPageOptions}
        option={perPage}
        name="perPageSelect"
        id="perPageSelect"
        onOptionChanged={onPerPageChanged}
      />
      {extraInfo}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li
            className={`page-item ${selectedPage === 1 ? 'disabled' : ''}`}
            key="previous"
          >
            <Page
              content="previous"
              onPageChanged={onPageChanged}
              page={selectedPage}
              pageNumber="previous"
            />
          </li>
          {pages.map((pageContent, i) => (
            <li
              className={`page-item ${((i + 1) === selectedPage)
                ? 'active'
                : ''}`}
              key={pageContent}
            >
              <Page
                content={pageContent.toString()}
                onPageChanged={onPageChanged}
                page={selectedPage}
                pageNumber={pageContent}
              />
            </li>
          ))}
          <li
            className={`page-item ${selectedPage === pagesCount
              ? 'disabled'
              : ''}`}
            key="next"
          >
            <Page
              content="next"
              onPageChanged={onPageChanged}
              page={selectedPage}
              pageNumber="next"
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
