import React from 'react';

import PropTypes from 'prop-types';

let _ = require('lodash');
const classNames = require('classnames');

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

  isUnDisable = (page) => {
    const { onPageChange, preparedArrPages } = this.props;

    onPageChange(page);

    if (page !== 0 || page !== preparedArrPages.length) {
      this.setState({
        nextDisabled: false,
        prevDisable: false,
      });
    }
  }

  nextPage = (page) => {
    const { onPageChange, preparedArrPages } = this.props;

    if (page === preparedArrPages.length - 1) {
      onPageChange(page);
      this.setState({
        nextDisabled: true,
      });
    } else if (page !== preparedArrPages.length) {
      onPageChange(page);
      this.setState({
        prevDisable: false,
      });
    } else {
      this.setState({
        nextDisabled: true,
        prevDisable: false,
      });
    }
  }

  prevPage = (page) => {
    const { onPageChange } = this.props;

    if (page === 0) {
      onPageChange(page);
      this.setState({
        prevDisable: true,
      });
    } else if (page >= 0) {
      onPageChange(page);

      this.setState({
        nextDisabled: false,
      });
    } else {
      this.setState({
        prevDisable: true,
        nextDisabled: false,
      });
    }
  }

  toggleWithInfo = () => {
    this.setState(({ withInfo }) => ({
      withInfo: !withInfo,
    }));
  }

  changeView = () => {
    this.setState(({ changedView }) => ({
      changedView: !changedView,
    }));
  }

  render() {
    let { arrPages } = this.state;
    const {
      nextDisabled,
      prevDisable,
      withInfo,
      changedView,
    } = this.state;
    const {
      onPerPageChange,
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
        <div className="toggle-setting">
          <p>Show how many elements on page:</p>
          <input
            onChange={this.toggleWithInfo}
            type="checkbox"
            className="with-info"
          />
          <p>Quantity elements on page:</p>
          <select
            onChange={event => onPerPageChange(event)}
            value={perPage}
            className="repPage"
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <p className="change-view">Change view:</p>
          <input
            onChange={this.changeView}
            type="checkbox"
            className="with-info"
          />
        </div>

        <nav aria-label="page navigation example">
          <ul className="pagination">
            <li className={classNames('page-item', { disabled: prevDisable })}>
              <a
                onClick={() => this.prevPage(page - 1)}
                className="page-link"
                href="#"
              >
                Previous
              </a>
            </li>
            { arrPages.map((pagen, index) => (
              changedView
                ? (
                  <>
                    {
                      index === 0 && (
                        <li
                          className={
                            classNames('page-item', 'item',
                              { active: index === page })
                          }
                          key={_.uniqueId('key_')}
                        >
                          <a
                            onClick={() => this.isUnDisable(index)}
                            className="page-link"
                            href="#"
                          >
                            {index + 1}
                          </a>
                          {withInfo && <div>{pagen.additionalInfo}</div>}
                        </li>
                      )
                    }

                    {
                      index === page - 2
                        && arrPages.length > 3
                        && index !== 0
                        && <p>...</p>
                    }

                    {
                      (index === page
                        || index === page - 1
                        || index === page + 1)
                          && (index !== 0 && index !== arrPages.length - 1)
                        && (
                          <li
                            className={classNames('page-item', 'item',
                              { active: index === page })
                            }
                            key={_.uniqueId('key_')}
                          >
                            <a
                              onClick={() => this.isUnDisable(index)}
                              className="page-link"
                              href="#"
                            >
                              {index + 1}
                            </a>
                            {withInfo && <div>{pagen.additionalInfo}</div>}
                          </li>
                        )
                    }

                    {
                      index === page + 2
                        && arrPages.length > 3
                        && index !== arrPages.length - 1
                        &&  <p>...</p>
                    }

                    {
                      index === arrPages.length - 1 && (
                        <li
                          className={classNames('page-item', 'item',
                            { active: index === page })
                          }
                          key={_.uniqueId('key_')}
                        >
                          <a
                            onClick={() => this.isUnDisable(index)}
                            className="page-link"
                            href="#"
                          >
                            {index + 1}
                          </a>
                          {withInfo && <div>{pagen.additionalInfo}</div>}
                        </li>
                      )
                    }
                  </>
                )
                : (
                  <li
                    className={classNames('page-item', 'item',
                      { active: index === page })
                    }
                    key={_.uniqueId('key_')}
                  >
                    <a
                      onClick={() => this.isUnDisable(index)}
                      className="page-link"
                      href="#"
                    >
                      {index + 1}
                    </a>
                    {withInfo && (
                      <div className="addInfo">
                        {pagen.additionalInfo}
                      </div>
                    )}
                  </li>
                )
            ))
            }
            <li className={classNames('page-item', { disabled: nextDisabled })}>
              <a
                onClick={() => this.nextPage(page + 1)}
                className="page-link"
                href="#"
              >
                Next
              </a>
            </li>
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
