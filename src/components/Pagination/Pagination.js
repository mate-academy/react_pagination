import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { PaginationPages } from '../PaginationPages/PaginationPages';

export class Pagination extends React.Component {
  componentDidUpdate() {
    if (this.props.page > this.pagesQuantity) {
      this.props.setUrlPage(this.pagesQuantity, this.props.perPage);
    }
  }

  get pagesQuantity() {
    return Math.ceil(this.props.total / this.props.perPage);
  }

  #setPage = sideCoefficient => this.props.page + sideCoefficient

  render() {
    return (
      <nav
        aria-label="Page navigation example"
        className="row justify-content-center"
      >
        <ul className="pagination">
          <li className={`page-item ${this.props.page - 1 < 1 && 'disabled'}`}>
            <NavLink
              className="page-link"
              to={
                `/?page=${this.#setPage(-1)}&perPage=${this.props.perPage}`
              }
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </NavLink>
          </li>
          <PaginationPages
            pagesQuantity={this.pagesQuantity}
            page={this.props.page}
            perPage={this.props.perPage}
          />
          <li className={`page-item ${
            this.props.page + 1 > this.pagesQuantity && 'disabled'
          }`}
          >
            <NavLink
              className="page-link"
              to={
                `/?page=${this.#setPage(1)}&perPage=${this.props.perPage}`
              }
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setUrlPage: PropTypes.func.isRequired,
};
