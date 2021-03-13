import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class Pagination extends React.Component {
  state ={
    selectedPage: this.props.page,
  }

  handleClick = (page) => {
    this.setState({ selectedPage: page });
  }

  handleNext = () => {
    this.setState(prevState => ({
      selectedPage: prevState.selectedPage + 1,
    }));
  }

  handlePrevious = () => {
    this.setState(prevState => ({
      selectedPage: prevState.selectedPage - 1,
    }));
  }

  render() {
    const { total, perPage, withInfo } = this.props;
    const links = Math.ceil(total / perPage);
    const pages = Array.from({ length: links }, (_, i) => i + 1);

    return (
      <>
        <nav>
          <ul className="page__list">
            <button
              className="page__link"
              type="button"
              onClick={this.handlePrevious}
              disabled={this.state.selectedPage === 1}
            >
              Previous
            </button>

            {pages.map(page => (
              <li className="page__item" key={page}>
                <a
                  className={classNames('page__link',
                    { active: page === this.state.selectedPage })}
                  href="#"
                  onClick={() => this.handleClick(page)}
                >
                  {page}
                </a>
              </li>
            ))}

            <button
              className="page__link"
              type="button"
              onClick={this.handleNext}
              disabled={this.state.selectedPage === links}
            >
              Next
            </button>
          </ul>
        </nav>
        {this.state.selectedPage >= 6
          && (
          <p className="page__text">
            {withInfo}
          </p>
          )
        }
      </>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number,
  page: PropTypes.number,
  withInfo: PropTypes.string,
};

Pagination.defaultProps = {
  perPage: 5,
  page: 1,
  withInfo: '',
};
