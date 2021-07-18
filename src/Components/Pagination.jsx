import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

export const Pagination = ({
  prevPage, nextPage, total,
  firstVisiblePage, withInfo,
  onPageChange, page, perPage,
}) => {
  const list = [];

  const createButton = currentPage => (
    <button
      className={currentPage === +page
        ? 'list-page--active list-page'
        : 'list-page'}
      type="button"
      onClick={() => {
        if (currentPage !== +page) {
          onPageChange(currentPage);
        }
      }}
    >
      {currentPage}
    </button>
  );

  for (let i = firstVisiblePage; i <= firstVisiblePage + perPage - 1; i++) {
    const currentPage = i;

    list.push(
      <li
        key={currentPage}
      >
        {createButton(currentPage)}
      </li>
    );

    if (total < i + 1) {
      break;
    }
  }

  const createButtonList = (index, content) => {
    list.splice(index, 0,
      <li>
        {createButton(content)}
      </li>);
  };

  if (firstVisiblePage !== 1) {
    createButtonList(0, '...');
    createButtonList(0, 1);
  }

  if (total > firstVisiblePage + perPage) {
    createButtonList(list.length, '...');
    createButtonList(list.length, total);
  }

  return (
    <>
      {
      withInfo
      && (
      <h2>
          {`${firstVisiblePage} - 
          ${firstVisiblePage + perPage - 1 > total
            ? total
            : firstVisiblePage + perPage - 1}
          of ${total}`}
      </h2>
      )
      }
      <button
        type="button"
        onClick={prevPage}
        className="list-bottom"
        disabled={firstVisiblePage === 1}
      >
        prev
      </button>
      <ul className="list-pages">
        {list.map(elem => elem)}
      </ul>
      <button
        type="button"
        onClick={nextPage}
        className="list-bottom"
        disabled={firstVisiblePage + perPage > total}
      >
        next
      </button>
    </>
  );
};

Pagination.propTypes = {
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  firstVisiblePage: PropTypes.number.isRequired,
  withInfo: PropTypes.bool,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};

Pagination.defaultProps = {
  withInfo: true,
};
