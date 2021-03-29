import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';

class Pagination extends React.PureComponent {
  state = {
    activePage: this.props.page,
  }

  listOfPages = new Array(this.props.total).fill(1);

  setActivePage = pageNumber => () => {
    this.setState({
      activePage: pageNumber,
    });
  }

  nextPage = () => {
    const stepPerPage = (
      this.state.activePage + this.props.perPage > this.props.total
        ? this.props.total - this.state.activePage
        : this.props.perPage);

    this.setState((state) => {
      if (state.activePage < this.props.total) {
        return {
          activePage: state.activePage + stepPerPage,
        };
      }

      return {
        activePage: state.activePage,
      };
    });
  }

  prevPage = () => {
    const stepPerPage = this.state.activePage - this.props.perPage < 1
      ? this.state.activePage - 1
      : this.props.perPage;

    this.setState((state) => {
      if (state.activePage > 1) {
        return {
          activePage: state.activePage - stepPerPage,
        };
      }

      return {
        activePage: state.activePage,
      };
    });
  }

  render() {
    return (
      <>
        <div>
          {
            this.props.data[Number(this.state.activePage) - 1]
          }
        </div>
        <nav aria-label="Page navigation example">
          <ul className="Pagination">
            <li>
              <button
                type="button"
                className={this.state.activePage === 1
                  ? 'Pagination__prev-disable'
                  : 'Pagination__prev'
                }
                onClick={this.prevPage}
              >
                Previously
              </button>
            </li>
            {
              this.listOfPages.map((page, index) => (
                <li
                  key={index}
                >
                  <button
                    type="button"
                    className={index + 1 === +this.state.activePage
                      ? 'Pagination__item-active'
                      : 'Pagination__item'}
                    onClick={this.setActivePage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))
            }
            <li>
              <button
                type="button"
                className={this.state.activePage === this.props.total
                  ? 'Pagination__next-disable'
                  : 'Pagination__next'
                }
                onClick={this.nextPage}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  page: PropTypes.number,
  perPage: PropTypes.number,
  data: PropTypes.arrayOf(),
};

Pagination.defaultProps = {
  page: 1,
  perPage: 1,
  data: [],
};

export default Pagination;
