import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';
import classNames from 'classnames';

export class Pagination extends React.Component {
  state = {
    selected: this.props.page,
  }

  handleSelected = (event) => {
    const { target } = event;

    this.setState({
      selected: +target.textContent,
    });
  }

  handlePrevious = () => {
    this.setState(prevState => ({
      selected: prevState.selected - 1,
    }));
  }

  handleNext = () => {
    this.setState(prevState => ({
      selected: prevState.selected + 1,
    }));
  }

  render() {
    const { total, perPage, withInfo } = this.props;
    const { selected } = this.state;
    const totalPages = Math.ceil(total / perPage);
    const pages = Array.from(Array(totalPages), (_, index) => index + 1);
    const startAddAdditionalInfoFrom = 6;
    const addAdditionalInfoTo = 10;

    return (
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a
                className={classNames('page-link', {
                  disabled: selected < 2,
                })}
                href={`#${selected}`}
                onClick={this.handlePrevious}
              >
                Previous
              </a>
            </li>
            {pages.map(page => (
              <li className="page-item" key={page}>
                <a
                  className={classNames('page-link', {
                    selected: selected === page,
                  })}
                  href={`#${page}`}
                  onClick={this.handleSelected}
                >
                  {page}
                </a>
              </li>
            ))}

            <li className="page-item">
              <a
                className={classNames('page-link', {
                  disabled: selected === pages[pages.length - 1],
                })}
                href={`#${selected}`}
                onClick={this.handleNext}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
        {selected >= startAddAdditionalInfoFrom
          && selected <= addAdditionalInfoTo
          && (
            <div>
              {withInfo}
            </div>
          )
      }
      </div>
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
