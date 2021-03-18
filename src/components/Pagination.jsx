import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export class Pagination extends React.Component {
  state = {
    selectLink: this.props.page,
    withInfo: false,
  }

  handleNext = () => {
    if (this.state.selectLink >= 6) {
      this.setState({
        withInfo: true,
      });
    } else {
      this.setState({
        withInfo: false,
      });
    }

    this.setState(prevState => ({
      selectLink: prevState.selectLink + 1,
    }));
  }

  handlePrevious = () => {
    if (this.state.selectLink >= 6) {
      this.setState({
        withInfo: true,
      });
    } else {
      this.setState({
        withInfo: false,
      });
    }

    this.setState(prevState => ({
      selectLink: prevState.selectLink - 1,
    }));
  }

  handleClick = (page) => {
    if (this.state.selectLink >= 6) {
      this.setState({
        withInfo: true,
      });
    } else {
      this.setState({
        withInfo: false,
      });
    }

    this.setState({
      selectLink: page,
    });
  }

  render() {
    const { selectLink, withInfo } = this.state;
    const { total, perPage } = this.props;
    const links = Math.ceil(total / perPage);
    const pages = Array.from({ length: links }, (_, i) => i + 1);

    return (
      <div>
        {withInfo && (
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
                className={classNames('link',
                  { link__active: page === selectLink })}
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
};
