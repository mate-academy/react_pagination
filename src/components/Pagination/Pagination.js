import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function makeArray(maxNumber, currPage) {
  const arr = [];

  arr.push(1);

  if (currPage > 3) {
    arr.push('...');
  }

  if (currPage > 2) {
    arr.push(currPage - 1);
  }

  if (currPage !== 1 && currPage !== maxNumber) {
    arr.push(currPage);
  }

  if (maxNumber - 1 > currPage) {
    arr.push(currPage + 1);
  }

  if (maxNumber - 2 > currPage) {
    arr.push('...');
  }

  if (maxNumber !== 1) {
    arr.push(maxNumber);
  }

  return arr;
}

export const Pagination = React.memo(({
  total,
  perPageItems,
  currentPage,
  onPage,
  onNext,
  onPrev,
  withInfo,
}) => {
  const numberOfPages = Math.ceil(total / perPageItems);
  const pages = makeArray(numberOfPages, currentPage);
  const firstItem = (currentPage - 1) * perPageItems + 1;
  const lastItem = currentPage * perPageItems > total
    ? total
    : currentPage * perPageItems;
  const preparedPages = pages.map((name, index) => ({
    name,
    id: index,
  }));

  return (
    <nav className="is-flex is-align-items-center my-5">
      {withInfo && (
        <p>
          {`${firstItem} - ${lastItem} of ${total}`}
        </p>
      )}
      <ul className="is-flex ml-3">
        <li>
          <button
            type="button"
            className="button"
            onClick={onPrev}
            disabled={currentPage === 1}
          >
            {`<`}
          </button>
        </li>
        {
          preparedPages.map(page => (
            <li key={page.id}>
              <button
                type="button"
                className={classNames({
                  button: true,
                  'is-info': page.name === currentPage,
                })}
                onClick={() => onPage(page.name)}
                disabled={page.name === '...'}
              >
                {page.name}
              </button>
            </li>
          ))
        }
        <li>
          <button
            type="button"
            className="button"
            onClick={onNext}
            disabled={currentPage === numberOfPages}
          >
            {`>`}
          </button>
        </li>
      </ul>
    </nav>
  );
});

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPageItems: PropTypes.number,
  currentPage: PropTypes.number,
  onPage: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  withInfo: PropTypes.bool,
};

Pagination.defaultProps = {
  perPageItems: 5,
  currentPage: 1,
  withInfo: false,
};
