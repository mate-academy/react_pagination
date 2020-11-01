import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '../Button';
import { PaginationSelect } from '../PaginationSelect';

export const Pagination = (props) => {
  const { total, perPage, page, onPageChange, onPerPageChange } = props;

  const buttonsAmount = Math.ceil(total / perPage);
  const buttonsIndexes = new Array(buttonsAmount).fill(0)
    .map((zero, index) => index + 1);

  const getInfoText = () => {
    const startItem = ((page - 1) * perPage) + 1;

    if (startItem >= total - perPage) {
      return `${startItem} - ${total} of ${total}`;
    }

    return `${startItem} - ${startItem + perPage} of ${total}`;
  };

  const previousPage = () => {
    onPageChange(page - 1);
  };

  const nextPage = () => {
    onPageChange(page + 1);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <PaginationSelect
        perPage={perPage}
        onPerPageChange={onPerPageChange}
      />
      <div>{getInfoText()}</div>

      <ul className="pagination justify-content-center mt-2">
        <li
          className={classNames('page-item', {
            disabled: page === 1,
          })}
        >
          <button
            type="button"
            className="page-link"
            onClick={previousPage}
            disabled={page === 1}
          >
            Previous
          </button>
        </li>

        {
          buttonsIndexes.map(buttonIndex => (
            <li
              key={buttonIndex}
              className={classNames('page-item', 'spread-item', {
                active: page === buttonIndex,
              })}
            >
              <Button
                buttonIndex={buttonIndex}
                buttonsAmount={buttonsAmount}
                onPageChange={onPageChange}
                page={page}
              />
            </li>
          ))
        }

        <li
          className={classNames('page-item', {
            disabled: page === buttonsAmount,
          })}
        >
          <button
            type="button"
            className="page-link"
            onClick={nextPage}
            disabled={page === buttonsAmount}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPerPageChange: PropTypes.func.isRequired,
};
