import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import './Pagination.css';

export class Pagination extends React.Component {
  state = {
    visiblePages: Array.from(
      new Array(this.props.perPage), (value, index) => index + 1,
    ),
  };

  previousButtonHandler = () => {
    const { pageChanger, currentPage } = this.props;

    if (this.state.visiblePages[0] === currentPage) {
      this.setState(prevState => ({
        visiblePages: prevState.visiblePages.map(page => page - 1),
      }));
    }

    pageChanger(currentPage - 1);
  };

  nextButtonHandler = () => {
    const { pageChanger, currentPage } = this.props;
    const { visiblePages } = this.state;

    if (visiblePages[visiblePages.length - 1] === currentPage) {
      this.setState(prevState => ({
        visiblePages: prevState.visiblePages.map(page => page + 1),
      }));
    }

    pageChanger(currentPage + 1);
  };

  render() {
    const { total, currentPage, pageChanger } = this.props;
    const { visiblePages } = this.state;

    return (
      <nav className="navigation">
        <ul className="pagination">
          <li className="page-item">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={this.previousButtonHandler}
              className="button prev-button"
            >
              Previous
            </button>
          </li>

          {visiblePages.map(page => (
            <li
              key={page}
              className="page-item"
            >
              <button
                type="button"
                className={
                  ClassNames('button', { current: page === currentPage })
                }
                onClick={() => {
                  if (page !== currentPage) {
                    pageChanger(page);
                  }
                }}
              >
                {page}
              </button>
            </li>
          ))}

          <li className="page-item">
            <button
              type="button"
              disabled={currentPage === total}
              onClick={this.nextButtonHandler}
              className="button next-button"
            >
              Next
            </button>
          </li>
        </ul>

        <p className="pagination-info">
          {`
            ${visiblePages[0]} -
            ${visiblePages[visiblePages.length - 1]}
            of ${total}
          `}
        </p>
      </nav>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number,
  currentPage: PropTypes.number,
  pageChanger: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  perPage: 5,
  currentPage: 1,
};
