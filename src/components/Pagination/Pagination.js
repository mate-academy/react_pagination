import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function makeArray(minNumber, maxNumber) {
  const arr = [];

  for (let i = minNumber; i <= maxNumber; i += 1) {
    arr.push(i);
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
  const pages = makeArray(1, numberOfPages);
  const firstItem = (page - 1) * perPage + 1;
  const lastItem = page * perPage > total ? total : page * perPage;

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
            Prev
          </button>
        </li>
        {
          pages.map(num => (
            <li key={num}>
              <button
                type="button"
                className={classNames({
                  button: true,
                  'is-info': num === page,
                })}
                onClick={() => onPage(num)}
              >
                {num}
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
            Next
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
