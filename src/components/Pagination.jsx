import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export class Pagination extends React.Component {
  state = {
    selectedPage: this.props.page,
    breakPointForInfo: 6,
    checkWithInfo: this.props.withInfo,
  }

  checkInfo = () => {
    const { selectedPage, breakPointForInfo } = this.state;

    return this.setState({
      checkWithInfo: selectedPage >= breakPointForInfo,
    });
  }

  handleNext = () => {
    this.setState(prevState => ({
      selectedPage: prevState.selectedPage + 1,
    }));
    this.checkInfo();
  }

  handlePrevious = () => {
    this.checkInfo();

    this.setState(prevState => ({
      selectedPage: prevState.selectedPage - 1,
    }));
  }

  handleClick = (page) => {
    this.checkInfo();

    this.setState({
      selectedPage: page,
    });
  }

  render() {
    const { selectedPage, checkWithInfo } = this.state;
    const { total, perPage } = this.props;
    const links = Math.ceil(total / perPage);
    const pages = Array.from({ length: links }, (_, i) => i + 1);

    return (
      <div>
        {checkWithInfo && (
          <h1>Some text</h1>
        )}
        <ul className="page">
          <button
            type="button"
            className="button"
            onClick={this.handlePrevious}
          >
            prev
          </button>
          {pages.map(page => (
            <li key={page}>
              <a
                href={`#${page}`}
                className={
                  classNames(
                    'link',
                    { link__active: page === selectedPage },
                  )}
                onClick={() => this.handleClick(page)}
              >
                {page}
              </a>
            </li>
          ))}
          <button
            type="button"
            className="button"
            onClick={this.handleNext}
          >
            next
          </button>
        </ul>
      </div>
    );
  }
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  withInfo: PropTypes.bool.isRequired,
};
