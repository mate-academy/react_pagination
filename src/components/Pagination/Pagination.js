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
  perPage,
  page,
  onPage,
  onNext,
  onPrev,
  withInfo,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pages = makeArray(numberOfPages, page);
  const firstItem = (page - 1) * perPage + 1;
  const lastItem = page * perPage > total ? total : page * perPage;
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
            disabled={page === 1}
          >
            {`<`}
          </button>
        </li>
        {
          preparedPages.map(num => (
            <li key={num.id}>
              <button
                type="button"
                className={classNames({
                  button: true,
                  'is-info': num.name === page,
                })}
                onClick={() => onPage(num.name)}
                disabled={num.name === '...'}
              >
                {num.name}
              </button>
            </li>
          ))
        }
        <li>
          <button
            type="button"
            className="button"
            onClick={onNext}
            disabled={page === numberOfPages}
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
  perPage: PropTypes.number,
  page: PropTypes.number,
  onPage: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  withInfo: PropTypes.bool,
};

Pagination.defaultProps = {
  perPage: 5,
  page: 1,
  withInfo: false,
};
