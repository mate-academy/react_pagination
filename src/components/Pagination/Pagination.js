import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

export const Pagination = (props) => {
  const { total, page, perPage, onPageChange, withInfo } = props;

  const handleButtonClick = pageNumber => onPageChange(pageNumber);

  const renderButtons = () => (
    new Array(Math.ceil(total / perPage))
      .fill('')
      .map((it, index) => {
        const buttonClassName = (index + 1 === page)
          ? 'ui red basic button'
          : 'ui green basic button';

        const key = index + 1;

        return (
          <button
            type="button"
            key={key}
            className={buttonClassName}
            onClick={() => handleButtonClick(index + 1)}
          >
            {index + 1}
          </button>
        );
      })
  );

  const renderInfo = () => {
    if (!withInfo) {
      return null;
    }

    const min = page * perPage - perPage + 1;
    const max = Math.min(page * perPage, total);

    return `${min} - ${max} of ${total}`;
  };

  const handlePrevButtonClick = () => onPageChange(page - 1);

  const handleNextButtonClick = () => onPageChange(page + 1);

  return (
    <div className="ui container">
      <p className="info">
        {renderInfo()}
      </p>

      <div className="buttons">
        <button
          type="button"
          className="ui green basic button"
          disabled={page === 1 ? 'disabled' : ''}
          onClick={handlePrevButtonClick}
        >
          Prev
        </button>

        {renderButtons()}

        <button
          type="button"
          className="ui green basic button"
          disabled={page === Math.ceil(total / perPage) ? 'disabled' : ''}
          onClick={handleNextButtonClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  page: PropTypes.number,
  perPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  withInfo: PropTypes.bool,
};

Pagination.defaultProps = {
  page: 1,
  perPage: 5,
  withInfo: false,
};
