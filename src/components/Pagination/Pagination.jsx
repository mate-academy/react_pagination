import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Pagination.css';

export class Pagination extends Component {
  state = {
    currentPage: this.props.page,
    step: 0,
  }

  onPageChange = (event) => {
    const { value } = event.target;

    this.setState({ currentPage: +value });
  }

  handleNextStep = () => {
    this.setState(prevState => ({
      step: prevState.step + 1,
    }));
  }

  handlePrevStep = () => {
    this.setState(prevState => ({
      step: prevState.step - 1,
    }));
  }

  handleChangeQuantityPerPage = (event) => {
    const { value } = event.target;

    this.props.onChange(value);
  }

  render() {
    const { perPage, total } = this.props;
    const { currentPage, step } = this.state;
    const initialValues = Array.from(
      { length: this.props.total }, (_, i) => i + 1,
    );

    const {
      onPageChange,
      handleChangeQuantityPerPage,
      handleNextStep,
      handlePrevStep,
    } = this;
    const slice = initialValues.slice(step, step + perPage);

    return (
      <>
        <nav aria-label="Pagination">
          <ul className="Pagination__list">
            <li className="Pagination__item">
              <button
                type="button"
                disabled={slice.includes(1)}
                className="Pagination__previous"
                onClick={handlePrevStep}
              >
                Previous
              </button>
            </li>
            {slice.map((eachPage) => {
              const isActiveClass = currentPage === eachPage
                ? 'Pagination__page_active'
                : null;

              return (
                <li key={eachPage}>
                  <button
                    type="button"
                    value={eachPage}
                    onClick={onPageChange}
                    className={`Pagination__page ${isActiveClass}`}
                  >
                    {eachPage}
                  </button>
                </li>
              );
            })}
            <li className="page-item">
              <button
                disabled={slice.includes(total)}
                className="Pagination__next"
                type="button"
                onClick={handleNextStep}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
        <div className={classNames('Pagination__addition', {
          Pagination__addition_extra: currentPage > 5,
        })}
        >
          You have lots of opportunities to make money together with us
        </div>
        <select
          onChange={handleChangeQuantityPerPage}
          className="Pagination__select"
          value={perPage}
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </>
    );
  }
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
