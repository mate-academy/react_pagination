import React from 'react';
import classNames from 'classnames';
import './App.scss';
import Pagination from './components/Pagination';

const perPageList = [
  3, 5, 10, 20,
];

class App extends React.Component {
  state = {
    currentPage: 1,
    withInfo: false,
    changedView: false,
    perPageSelect: {
      isShown: false,
      perPage: 5,
    },
  };

  handleChangedView = () => {
    this.setState(({ changedView }) => ({
      changedView: !changedView,
    }));
  };

  handleWithInfoChange = () => {
    this.setState(({ withInfo }) => ({
      withInfo: !withInfo,
    }));
  };

  onPageChange = currentPage => this.setState({ currentPage });

  handleDropdownToggle = () => {
    this.setState(({ perPageSelect }) => ({
      perPageSelect: {
        ...perPageSelect,
        isShown: !perPageSelect.isShown,
      },
    }));
  };

  handleDropdownSelect = (e) => {
    this.setState({
      perPageSelect: {
        isShown: false,
        perPage: +e.target.dataset.value,
      },
    });
  };

  render() {
    const {
      perPageSelect, currentPage, withInfo, changedView,
    } = this.state;

    return (
      <div className="app">
        <form className="form">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={this.handleDropdownToggle}
            >
              Pagination per page
            </button>
            <div
              className={classNames('dropdown-menu', {
                show: perPageSelect.isShown,
              })}
              aria-labelledby="dropdownMenuButton"
            >
              {perPageList.map(item => (
                <p
                  key={item}
                  className="dropdown-item"
                  data-value={item}
                  onClick={this.handleDropdownSelect}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="form-check">
            <label className="form-check-label" htmlFor="exampleCheck1">
              Show extra info
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                checked={withInfo}
                onChange={this.handleWithInfoChange}
              />
            </label>
          </div>

          <div className="form-check">
            <label className="form-check-label" htmlFor="change-view">
              Change view
              <input
                type="checkbox"
                className="form-check-input"
                id="change-view"
                checked={changedView}
                onChange={this.handleChangedView}
              />
            </label>
          </div>
        </form>

        <Pagination
          total={42}
          perPage={perPageSelect.perPage}
          page={currentPage}
          onPageChange={this.onPageChange}
          withInfo={withInfo}
          changedView={changedView}
        />
      </div>
    );
  }
}

export default App;
