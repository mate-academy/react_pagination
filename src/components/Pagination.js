/* eslint-disable max-len */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Pagination extends Component {
  state = {
    total: this.props.total,
    perPage: this.props.perPage,
    page: this.props.page,
    withInfo: this.props.withInfo,
    onPageChange: this.props.onPageChange,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps });
  }

  info() {
    const firstItem = this.state.page * this.state.perPage - this.state.perPage + 1;
    let lastItem = this.state.page * this.state.perPage;

    lastItem = lastItem >= this.state.total ? this.state.total : lastItem;

    return `${firstItem} - ${lastItem} of ${this.state.total}`;
  }

  page(page = this.state.page, disabled = false, empty = false) {
    return (
      <li className={disabled ? 'page-item disabled' : 'page-item'}>
        <Link className="page-link" to={`?page=${page}perPage=${this.state.perPage}`}>{empty ? '...' : page}</Link>
      </li>
    );
  }

  pagination() {
    const currentPage = this.state.page;
    const firstPage = 1;
    const lastPage = Math.ceil(this.state.total / this.state.perPage);

    return (
      <>
        {this.page(firstPage, currentPage === firstPage)}

        {currentPage - 2 > 1 ? this.page(currentPage - 2, currentPage - 2 !== 2, currentPage - 2 !== 2) : ''}
        {currentPage - 1 > 1 ? this.page(currentPage - 1) : ''}
        {(currentPage > 1 && currentPage < lastPage) ? this.page(currentPage, true) : ''}
        {currentPage + 1 < lastPage ? this.page(currentPage + 1) : ''}
        {currentPage + 2 < lastPage ? this.page(currentPage + 2, currentPage + 2 !== lastPage - 1, currentPage + 2 !== lastPage - 1) : ''}

        {firstPage !== lastPage ? this.page(lastPage, currentPage === lastPage) : ''}
      </>
    );
  }

  render() {
    return (

      <>
        <p>
          {this.state.withInfo ? this.info() : ''}
        </p>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li
              className={
                this.state.page === 1
                  ? 'disabled page-item'
                  : 'page-item'
              }
            >
              <button
                className="page-link"
                value="prev"
                type="button"
                onClick={
                  this.state.page === 1
                    ? () => {}
                    : this.state.onPageChange
                }
              >
                &lt;&lt;&lt;
              </button>
            </li>

            {this.pagination()}

            <li
              className={
                this.state.page * this.state.perPage >= this.state.total
                  ? 'disabled page-item'
                  : 'page-item'
              }
            >
              <button
                className="page-link"
                value="next"
                type="button"
                onClick={
                  this.state.page * this.state.perPage >= this.state.total
                    ? () => {}
                    : this.state.onPageChange
                }
              >
                &gt;&gt;&gt;
              </button>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  withInfo: PropTypes.number.isRequired,
  onPageChange: PropTypes.number.isRequired,
};
