/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import uuid from 'uuid-random';
import { PaginationTypes } from './PaginationTypes';

import './Pagination.css';

export class Pagination extends React.Component {
  state = {
    paginationSchema: [],
  }

  componentDidMount() {
    this.getPaginationSchema(1);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.amount !== this.props.amount) {
      this.props.onPageChange(1);
      this.getPaginationSchema(1);
    }
  }

  getPaginationSchema = (currentPage) => {
    const { amount } = this.props;

    if (amount <= 5) {
      this.setState({
        paginationSchema:
          Array.from({ length: amount }, (_, index) => index + 1),
      });

      return;
    }

    if (currentPage === 1) {
      this.setState({
        paginationSchema: [currentPage, currentPage + 1, '...', amount],
      });

      return;
    }

    if (currentPage === 2) {
      this.setState({
        paginationSchema:
          [currentPage - 1, currentPage, currentPage + 1, '...', amount],
      });

      return;
    }

    if (currentPage === 3 && currentPage !== amount) {
      this.setState({
        paginationSchema:
          [
            currentPage - 2,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            '...',
            amount],
      });

      return;
    }

    if (currentPage === amount) {
      this.setState({
        paginationSchema: [1, '...', currentPage - 1, currentPage],
      });

      return;
    }

    if (currentPage === amount - 1) {
      this.setState({
        paginationSchema:
          [
            1,
            '...',
            currentPage - 1,
            currentPage,
            currentPage + 1,
          ],
      });

      return;
    }

    if (currentPage === amount - 2) {
      this.setState({
        paginationSchema:
          [
            1,
            '...',
            currentPage - 1,
            currentPage,
            currentPage + 1,
            currentPage + 2,
          ],
      });

      return;
    }

    this.setState({
      paginationSchema:
        [
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          amount,
        ],
    });
  }

  render() {
    const { current, amount, onPageChange } = this.props;
    const { paginationSchema } = this.state;

    return (
      <nav aria-label="Page-navigation">
        <ul className="pagination">
          <li
            className={current > 1 ? 'page-item' : 'page-item disabled'}
          >
            <a
              className="page-link"
              href="/#"
              aria-label="Previous"
              onClick={
                (event) => {
                  event.preventDefault();
                  onPageChange(current - 1);
                  this.getPaginationSchema(current - 1);
                }
              }
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {paginationSchema.map(
            element => (typeof element === 'number'
              ? (
                <li
                  key={uuid()}
                  className={
                    element === current
                      ? 'page-item active-item' : 'page-item'
                  }
                >
                  <a
                    className="page-link"
                    href="/#"
                    onClick={
                      (event) => {
                        event.preventDefault();
                        onPageChange(element);
                        this.getPaginationSchema(element);
                      }
                    }
                  >
                    {element}
                  </a>
                </li>
              )
              : (<li key={uuid()} className="page-item">{element}</li>)),
          )}
          <li
            className={current < amount
              ? 'page-item' : 'page-item disabled'}
          >
            <a
              className="page-link"
              href="/#"
              aria-label="Next"
              onClick={
                (event) => {
                  event.preventDefault();
                  onPageChange(current + 1);
                  this.getPaginationSchema(current + 1);
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
