import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Pagination.scss';

export default class Pagination extends Component {
  handlerPageClick = pageNumber => this.props.onPageChange(pageNumber);

  handlerPageKeyPress = pageNumber => this.handlerPageClick(pageNumber);

  render() {
    const {
      total, perPage, page, withInfo,
    } = this.props;

    const pagesQuantity = Math.ceil(total / perPage);
    const pagesList = Array(pagesQuantity).fill('pagination-');

    return (
      <nav>
        <ul className="pagination justify-content-center">
          <li
            className={classNames('page-item page-arrow', {
              disabled: page === 1,
            })}
            onClick={page !== 1
              ? () => this.handlerPageClick(page - 1)
              : undefined}
            onKeyPress={page !== 1
              ? () => this.handlerPageKeyPress(page - 1)
              : undefined}
          >
            <span className="page-link">Previous</span>
          </li>

          {pagesList.map((item, i) => (
            <li
              key={item + i}
              className={classNames('page-item', {
                active: i === page - 1,
              })}
              onClick={i !== page - 1
                ? () => this.handlerPageClick(i + 1)
                : undefined}
              onKeyPress={i !== page - 1
                ? () => this.handlerPageKeyPress(i + 1)
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
          ))}

          <li
            className={classNames('page-item page-arrow', {
              disabled: page >= pagesQuantity,
            })}
            onClick={(page < pagesQuantity)
              ? () => this.handlerPageClick(page + 1)
              : undefined}
            onKeyPress={(page < pagesQuantity)
              ? () => this.handlerPageKeyPress(page + 1)
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
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number,
  withInfo: PropTypes.bool,
  onPageChange: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  page: 1,
  withInfo: false,
};
