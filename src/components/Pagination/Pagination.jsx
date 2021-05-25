import React from 'react';
import './Pagination.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Pagination extends React.Component {
  state = {
    maxCountPage: this.props.maxCount,
  };

  createShowPages = (pagesNumber) => {
    const { selectedPage: selPage } = this.props;
    const pagesForShow = [];

    if (pagesNumber === 1) {
      return [1];
    }

    pagesForShow.push(1);
    for (let i = 2; i < pagesNumber; i += 1) {
      if (i === selPage || i - 1 === selPage || i + 1 === selPage) {
        pagesForShow.push(i);
      } else if (pagesForShow[pagesForShow.length - 1] !== null) {
        pagesForShow.push(null);
      }
    }

    pagesForShow.push(pagesNumber);

    return pagesForShow;
  };

  changePageHandler = (newSelectedPage) => {
    const { onChangeSelected, selectedPage } = this.props;

    if (selectedPage !== newSelectedPage) {
      onChangeSelected(newSelectedPage);
    }
  };

  maxCountHandler(event) {
    const { value } = event.target;
    const { maxCount, onChangeMaxCount } = this.props;

    if (maxCount !== value) {
      onChangeMaxCount(+value);
      this.setState({ maxCountPage: value });
    }
  }

  render() {
    const { selectedPage, total, maxCount } = this.props;
    const { maxCountPage } = this.state;
    const pagesNumber = Math.ceil(total / maxCount);
    const canLeft = selectedPage !== 1;
    const canRight = selectedPage !== pagesNumber;
    const showPages = this.createShowPages(pagesNumber);

    return (
      <>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li
              className={classNames(
                'page-item', { disabled: !canLeft },
              )}
            >
              <button
                className="page-link"
                type="button"
                onClick={() => this.changePageHandler(selectedPage - 1)}
              >
                Previous
              </button>
            </li>

            {showPages.map((item, index, arr) => (
              item === null ? (
                <li className="page-item disabled" key={arr[index - 1] + 1}>
                  <span className="page-link">
                    {' ... '}
                  </span>
                </li>
              ) : (
                <li className="page-item" key={item}>
                  <button
                    onClick={() => this.changePageHandler(item)}
                    type="button"
                    name={item}
                    className={classNames(
                      'page-link',
                      { 'page-link_active': item === selectedPage },
                    )}
                  >
                    {item}
                  </button>
                </li>
              )
            ))}

            <li
              className={classNames(
                'page-item', { disabled: !canRight },
              )}
            >
              <button
                className="page-link"
                type="button"
                onClick={() => this.changePageHandler(selectedPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>

        <select
          name="maxCountPage"
          onChange={event => this.maxCountHandler(event)}
          value={maxCountPage}
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>

      </>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  maxCount: PropTypes.number.isRequired,
  onChangeMaxCount: PropTypes.func.isRequired,
  selectedPage: PropTypes.number.isRequired,
  onChangeSelected: PropTypes.func.isRequired,
};

export default Pagination;
