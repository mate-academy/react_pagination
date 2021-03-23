import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Select } from '../Select';
import { Button } from '../Button';
import './Pagination.css';

export class Pagination extends Component {
  state = {
    currentPage: this.props.page,
    offsetPaginationRelativeToTheBeginning: 0,
  }

  onPageChange = (event) => {
    const { value } = event.target;

    this.setState({ currentPage: +value });
  }

  handleNextStep = () => {
    this.setState(prevState => ({
      offsetPaginationRelativeToTheBeginning:
        prevState.offsetPaginationRelativeToTheBeginning + 1,
    }));
  }

  handlePrevStep = () => {
    this.setState(prevState => ({
      offsetPaginationRelativeToTheBeginning:
        prevState.offsetPaginationRelativeToTheBeginning - 1,
    }));
  }

  handleChangeQuantityPerPage = (event) => {
    const { value } = event.target;

    this.props.onChange(value);
  }

  render() {
    const { perPage, total, withInfo } = this.props;
    const startPagination = 1;
    const { currentPage, offsetPaginationRelativeToTheBeginning } = this.state;
    const quantityOfPages = Array.from(
      { length: this.props.total }, (_, i) => i + 1,
    );

    const {
      onPageChange,
      handleChangeQuantityPerPage,
      handleNextStep,
      handlePrevStep,
    } = this;
    const extractedPages = quantityOfPages.slice(
      offsetPaginationRelativeToTheBeginning,
      offsetPaginationRelativeToTheBeginning + perPage,
    );

    return (
      <>
        <nav aria-label="pagination">
          <ul className="pagination__list">
            <li className="pagination__item">
              <Button
                text="Previous"
                onChangeStep={handlePrevStep}
                onDisable={extractedPages.includes(startPagination)}
                name="pagination__previous"
              />
            </li>
            {extractedPages.map((page) => {
              const isActive = currentPage === page
                ? 'pagination__page_active'
                : '';

              return (
                <li key={page}>
                  <button
                    type="button"
                    value={page}
                    onClick={onPageChange}
                    className={`pagination__page ${isActive}`}
                  >
                    {page}
                  </button>
                </li>
              );
            })}
            <li className="page-item">
              <Button
                text="Next"
                name="pagination__next"
                onChangeStep={handleNextStep}
                onDisable={extractedPages.includes(total)}
              />
            </li>
          </ul>
        </nav>
        <div className={classNames('withInfo', {
          'withInfo--active': currentPage > withInfo,
        })}
        >
          You have lots of opportunities to make money together with us
        </div>
        <Select
          onChangeAmountOfPages={handleChangeQuantityPerPage}
          amountPage={perPage}
        />
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
