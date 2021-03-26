import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';

class Pagination extends React.PureComponent {
  state = {
    activeButton: this.props.page,
  }

  setNumber = pageNumber => () => {
    this.setState({
      activeButton: pageNumber,
    });
  }

  nextPage = () => {
    const stepPerPage = (
      this.state.activeButton + this.props.perPage > this.props.total
        ? this.props.total - this.state.activeButton
        : this.props.perPage);

    this.setState((state) => {
      if (state.activeButton < this.props.total) {
        return {
          activeButton: state.activeButton + stepPerPage,
        };
      }

      return {
        activeButton: state.activeButton,
      };
    });
  }

  prevPage = () => {
    const stepPerPage = this.state.activeButton - this.props.perPage < 1
      ? this.state.activeButton - 1
      : this.props.perPage;

    this.setState((state) => {
      if (state.activeButton > 1) {
        return {
          activeButton: state.activeButton - stepPerPage,
        };
      }

      return {
        activeButton: state.activeButton,
      };
    });
  }

  render() {
    const listOfPages = [];

    for (let i = 1; i < this.props.total + 1; i += 1) {
      listOfPages.push(i);
    }

    return (
      <>
        <div>
          {
            this.props.data[Number(this.state.activeButton) - 1]
          }
        </div>
        <nav aria-label="Page navigation example">
          <ul className="Pagination">
            <li>
              <button
                type="button"
                className={this.state.activeButton === 1
                  ? 'Pagination__prev-disable'
                  : 'Pagination__prev'
                }
                onClick={this.prevPage}
              >
                Previously
              </button>
            </li>
            {
              listOfPages.map(page => (
                <li
                  key={page}
                >
                  <button
                    type="button"
                    className={+page === +this.state.activeButton
                      ? 'Pagination__item-active'
                      : 'Pagination__item'}
                    onClick={this.setNumber(page)}
                  >
                    {page}
                  </button>
                </li>
              ))
            }
            <li>
              <button
                type="button"
                className={this.state.activeButton === this.props.total
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
