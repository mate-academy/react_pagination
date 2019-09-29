import React from 'react';

import PropTypes from 'prop-types';

import Navigation from './Navigation';
import Setting from './Setting';
import PrevButton from './PrevButton';
import NextButton from './NextButton';

let _ = require('lodash');

class Pagination extends React.Component {
  state = {
    arrPages: [],
    nextDisabled: false,
    prevDisable: true,
    withInfo: false,
    changedView: false,
  }

  componentDidMount() {
    const { page, perPage, total } = this.props;

    this.setState({
      arrPages: Array(Math.ceil(total / perPage)).fill(1).map((p, index) => {
        if (index === page) {
          return {
            additionalInfo: `${index}-${perPage}`,
            active: true,
          };
        }

        return {
          additionalInfo: `${(index * perPage)}-${((index + 1) * perPage) > total
            ? total
            : ((index + 1) * perPage)}`,
          active: false,
        };
      }),
    });
  }

  toggleButtonsChangedQuantity = (event) => {
    const { onPerPageChange, preparedArrPages, page } = this.props;

    onPerPageChange(event);

    if (page !== 0 || page !== preparedArrPages.length) {
      this.setState({
        nextDisabled: page === preparedArrPages.length,
        prevDisable: page === 0,
      });
    }
  }

  togglePages = (page) => {
    const { onPageChange, preparedArrPages } = this.props;

    onPageChange(page);

    this.setState({
      nextDisabled: page === preparedArrPages.length - 1,
      prevDisable: page === 0,
    });
  }

  togglePrevNext = ({ target: { name } }, page) => {
    const { onPageChange, preparedArrPages } = this.props;
    const { prevDisable, nextDisabled } = this.state;

    if (name === 'previous' && (page === 0 || page >= 0)) {
      onPageChange(page);
    }

    if (name === 'next' && (page === preparedArrPages.length - 1
      || page !== preparedArrPages.length)) {
      onPageChange(page);
    }

    const previousPrevButton = page === 0 || !(page >= 0)
      ? true
      : prevDisable;
    const nextPrevButton = page === 0
      ? nextDisabled
      : false;
    const previousNextButton = page === preparedArrPages.length - 1
      ? prevDisable
      : false;
    const nextNextButton = page === preparedArrPages.length - 1
    || !(page !== preparedArrPages.length)
      ? true
      : nextDisabled;

    this.setState({
      prevDisable: name === 'previous'
        ? previousPrevButton
        : previousNextButton,
      nextDisabled: name === 'previous'
        ? nextPrevButton
        : nextNextButton,
    });
  }

  toggleSetting = ({ target: { name } }) => {
    this.setState(({ withInfo, changedView }) => ({
      changedView: name === 'changeView' ? !changedView : changedView,
      withInfo: name === 'withInfo' ? !withInfo : withInfo,
    }));
  }

  render() {
    let { arrPages } = this.state;
    const {
      nextDisabled,
      prevDisable,
    } = this.state;
    const {
      page,
      perPage,
      preparedArrPages,
      total,
    } = this.props;

    arrPages = preparedArrPages.fill(1).map((p, index) => {
      if (index === page) {
        return {
          additionalInfo: `${(index * perPage)}-
          ${((index + 1) * perPage) > total
            ? total
            : ((index + 1) * perPage)}`,
          active: true,
        };
      }

      return {
        additionalInfo: `${(index * perPage)}-${((index + 1) * perPage) > total
          ? total
          : ((index + 1) * perPage)}`,
        active: false,
      };
    });

    return (
      <>
        <Setting
          toggleSetting={this.toggleSetting}
          toggleButtonsChangedQuantity={this.toggleButtonsChangedQuantity}
          perPage={perPage}
        />

        <nav aria-label="page navigation example">
          <ul className="pagination">

            <PrevButton
              togglePrevNext={this.togglePrevNext}
              page={page}
              prevDisable={prevDisable}
            />
            <Navigation
              arrPages={arrPages}
              page={page}
              state={this.state}
              togglePages={this.togglePages}
            />
            <NextButton
              togglePrevNext={this.togglePrevNext}
              page={page}
              nextDisabled={nextDisabled}
            />

          </ul>
        </nav>
      </>
    );
  }
}

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  onPerPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  preparedArrPages: PropTypes.arrayOf().isRequired,
  total: PropTypes.number.isRequired,
};

export default Pagination;
