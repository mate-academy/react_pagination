import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export class Pagination extends React.Component {
  state = {
    selectLink: this.props.page,
    withInfo: 'Some information',
  }

  handleNext = () => {
    this.setState(prevState => ({
      selectLink: prevState.selectLink + 1,
    }));
  }

  handlePrevious = () => {
    this.setState(prevState => ({
      selectLink: prevState.selectLink - 1,
    }));
  }

  handleClick = (page) => {
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
        {selectLink >= 6 && (
          <p className="title">
            {withInfo}
          </p>
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
