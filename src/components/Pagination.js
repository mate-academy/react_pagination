import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import classNames from 'classnames';
import './Pagination.scss';

export default class Pagination extends Component {
  handlePageClick = pageNumber => this.props.onPageChange(pageNumber);

  handlePageKeyPress = pageNumber => this.handlePageClick(pageNumber);

  blockPageItem = (i) => {
    const {
      total, perPage, page, withInfo,
    } = this.props;
    const pagesQuantity = Math.ceil(total / perPage);

    return (
      <li
        key={shortid.generate()}
        className={classNames('page-item', {
          active: i === page - 1,
        })}
        onClick={i !== page - 1
          ? () => this.handlePageClick(i + 1)
          : undefined}
      >
        <span className="page-link">
          {i + 1}
        </span>
        {withInfo && (
          <span className="page-info">
            {`${i * perPage + 1} - ${
              (i + 1) === pagesQuantity
                ? total
                : (i + 1) * perPage} of ${total}`}
          </span>
        )}
      </li>
    );
  };

  render() {
    const {
      total, perPage, page, changedView,
    } = this.props;

    const pagesQuantity = Math.ceil(total / perPage);
    const pagesList = Array(pagesQuantity).fill('pagination-');
    const ischangedView = changedView && pagesQuantity > 3;

    return (
      <nav>
        <ul className="pagination justify-content-center">
          <li
            className={classNames('page-item page-arrow', {
              disabled: page === 1,
            })}
            onClick={page !== 1
              ? () => this.handlePageClick(page - 1)
              : undefined}
            onKeyPress={page !== 1
              ? () => this.handlePageKeyPress(page - 1)
              : undefined}
          >
            <span className="page-link">Previous</span>
          </li>

          {pagesList.map((item, i) => (
            (!ischangedView
              || ((i === page - 1)
                || (i === page - 2)
                || (i === page)
                || (i === 0)
                || (i === pagesList.length - 1)))
              ? this.blockPageItem(i)
              : ((i === 1) || (i === pagesList.length - 2))
              && (<span className="page-dots">. . .</span>)
          ))}

          <li
            className={classNames('page-item page-arrow', {
              disabled: page >= pagesQuantity,
            })}
            onClick={(page < pagesQuantity)
              ? () => this.handlePageClick(page + 1)
              : undefined}
            onKeyPress={(page < pagesQuantity)
              ? () => this.handlePageKeyPress(page + 1)
              : undefined}
          >
            <span className="page-link">Next</span>
          </li>
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number,
  withInfo: PropTypes.bool,
  changedView: PropTypes.bool,
};

Pagination.defaultProps = {
  page: 1,
  withInfo: false,
  changedView: false,
};
