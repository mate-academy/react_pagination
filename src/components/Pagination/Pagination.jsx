import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class Pagination extends React.Component {
  state = {
    selectedPage: this.props.page,
  }

  inPageChange = (page) => {
    this.setState({
      selectedPage: +page.target.innerText,
    });
  }

  prevPage = (page) => {
    if (this.state.selectedPage === 1) {
      return;
    }

    this.setState(state => ({
      selectedPage: state.selectedPage - 1,
    }));
  }

  nextPage = (page) => {
    if (this.state.selectedPage
      === Math.ceil(this.props.total / this.props.perPage)
    ) {
      return;
    }

    this.setState(state => ({
      selectedPage: state.selectedPage + 1,
    }));
  }

  render() {
    const { total, perPage } = this.props;
    const { selectedPage } = this.state;

    const totalPages = Math.ceil(total / perPage);
    const pages = Array.from(Array(totalPages), (_, index) => index + 1);

    return (
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a
                onClick={this.prevPage}
                className={classNames('page-link-btn', {
                  disabled: selectedPage === 1,
                })}
                href={`#${selectedPage}`}
              >
                Previous
              </a>
            </li>
            {pages.map(page => (
              <li key={page} className="page-item">
                <a
                  onClick={this.inPageChange}
                  className={classNames('page-link', {
                    active: this.state.selectedPage === page,
                  })}
                  href={`#${page}`}
                >
                  {page}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a
                onClick={this.nextPage}
                className={classNames('page-link-btn', {
                  disabled: selectedPage === totalPages,
                })}
                href={`#${selectedPage}`}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
        {selectedPage > 4 && (
          <p>u can take some info from this small paragraph</p>
        )}
      </div>
    );
  }
}

Pagination.propTypes = {
  selectedPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};
