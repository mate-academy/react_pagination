import React from 'react';
import PropTypes from 'prop-types';

const classNames = require('classnames');

const Pagination = ({
  handleFlipButton, handlePageButtons, page, pageNumber,
  buttonsNumbers,
}) => {
  const paginationBtnClass = (buttonNumber, pageNum) => (
    classNames({
      button: true,
      'button--pagination': true,
      'button--active': buttonNumber === pageNum,
    }));

  const firstDotsClass = classNames({
    dots: true,
    hide: page < 4,
  });

  const lastDotsClass = classNames({
    dots: true,
    hide: page > buttonsNumbers.length - 3,
  });

  return (
    <div className="Pagination">
      <button
        name="back"
        onClick={handleFlipButton}
        className="button button--flip"
        type="submit"
        disabled={page === 1}
      >
        {'<'}
      </button>

      <ul className="pagination__list">
        <li key={buttonsNumbers[0]}>
          <button
            name={buttonsNumbers[0]}
            onClick={handlePageButtons}
            type="button"
            className={paginationBtnClass(
              buttonsNumbers[0],
              page,
              buttonsNumbers.length
            )}
          >
            {buttonsNumbers[0]}
          </button>
        </li>

        <li className={firstDotsClass}>...</li>

        {buttonsNumbers
          .filter((buttonNumber, index, buttons) => (
            index !== 0
            && index !== buttons.length - 1
            && (index + 1 === page
            || index + 1 === page + 1
            || index + 1 === page - 1)))
          .map((buttonNumber, i, buttons) => (
            <li key={buttonNumber}>
              <button
                name={buttonNumber}
                onClick={handlePageButtons}
                type="button"
                className={paginationBtnClass(
                  buttonNumber, page, buttons.length
                )}
              >
                {buttonNumber}
              </button>
            </li>
          ))}

        <li className={lastDotsClass}>...</li>

        <li key={buttonsNumbers[buttonsNumbers.length - 1]}>
          <button
            name={buttonsNumbers[buttonsNumbers.length - 1]}
            onClick={handlePageButtons}
            type="button"
            className={paginationBtnClass(
              buttonsNumbers[buttonsNumbers.length - 1],
              page,
              buttonsNumbers.length
            )}
          >
            {buttonsNumbers[buttonsNumbers.length - 1]}
          </button>
        </li>
      </ul>

      <button
        name="next"
        onClick={handleFlipButton}
        className="button button--flip"
        type="submit"
        disabled={page === pageNumber}
      >
        {'>'}
      </button>
    </div>
  );
};

Pagination.propTypes = {
  handleFlipButton: PropTypes.func.isRequired,
  handlePageButtons: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  buttonsNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Pagination;
