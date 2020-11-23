/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { PaginationTypes } from './PaginationTypes';

import './Pagination.css';

export class Pagination extends React.Component {
  state = {
    first: 0,
    last: 0,
    current: 0,
    precurrent: 0,
    postcurrent: 0,
  }

  componentDidMount() {
    this.updateState(this.props.page);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.perPage !== this.props.perPage) {
      this.props.onPageChange(1);
      this.updateState(1);
    }
  }

  updateState(newPage) {
    this.setState({
      first: newPage >= 3 ? 1 : 0,
      last:
      newPage <= Math.ceil(this.props.total / this.props.perPage) - 2
        ? Math.ceil(this.props.total / this.props.perPage) : 0,
      current: newPage,
      precurrent: newPage > 1 ? newPage - 1 : 0,
      postcurrent:
      newPage < Math.ceil(this.props.total / this.props.perPage)
        ? newPage + 1 : 0,
    });
  }

  render() {
    const { page, total, perPage, onPageChange } = this.props;
    const { first, last, current, precurrent, postcurrent } = this.state;

    return (
      <nav aria-label="Page-navigation">
        <ul className="pagination">
          <li
            className={page > 1 ? 'page-item' : 'page-item disabled'}
          >
            <a
              className="page-link"
              href="/#"
              aria-label="Previous"
              onClick={
                (event) => {
                  event.preventDefault();
                  onPageChange(page - 1);
                  this.updateState(page - 1);
                }
              }
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {first !== 0 && (
            <>
              <li
                className={
                  first === page
                    ? 'page-item active-item' : 'page-item'
                }
              >
                <a
                  className="page-link"
                  href="/#"
                  onClick={
                    (event) => {
                      event.preventDefault();
                      onPageChange(first);
                      this.updateState(first);
                    }
                  }
                >
                  {first}
                </a>
              </li>
              {page > 3 ? (<li className="page-item">...</li>) : null}
            </>
          )}
          {precurrent !== 0 && (
            <li
              className={
                precurrent === page
                  ? 'page-item active-item' : 'page-item'
              }
            >
              <a
                className="page-link"
                href="/#"
                onClick={
                  (event) => {
                    event.preventDefault();
                    onPageChange(precurrent);
                    this.updateState(precurrent);
                  }
                }
              >
                {precurrent}
              </a>
            </li>
          )}
          <li
            className={
              current === page
                ? 'page-item active-item' : 'page-item'
            }
          >
            <a
              className="page-link"
              href="/#"
              onClick={
                (event) => {
                  event.preventDefault();
                  onPageChange(current);
                  this.updateState(current);
                }
              }
            >
              {current}
            </a>
          </li>
          {postcurrent !== 0 && (
            <li
              className={
                postcurrent === page
                  ? 'page-item active-item' : 'page-item'
              }
            >
              <a
                className="page-link"
                href="/#"
                onClick={
                  (event) => {
                    event.preventDefault();
                    onPageChange(postcurrent);
                    this.updateState(postcurrent);
                  }
                }
              >
                {postcurrent}
              </a>
            </li>
          )}
          {last !== 0 && (
            <>
              {page < Math.ceil(this.props.total / this.props.perPage) - 2
                ? (<li className="page-item">...</li>) : null}
              <li
                className={
                  last === page
                    ? 'page-item active-item' : 'page-item'
                }
              >
                <a
                  className="page-link"
                  href="/#"
                  onClick={
                    (event) => {
                      event.preventDefault();
                      onPageChange(last);
                      this.updateState(last);
                    }
                  }
                >
                  {last}
                </a>
              </li>
            </>
          )}
          <li
            className={page < Math.ceil(total / perPage)
              ? 'page-item' : 'page-item disabled'}
          >
            <a
              className="page-link"
              href="/#"
              aria-label="Next"
              onClick={
                (event) => {
                  event.preventDefault();
                  onPageChange(page + 1);
                  this.updateState(page + 1);
                }
              }
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = PaginationTypes;
