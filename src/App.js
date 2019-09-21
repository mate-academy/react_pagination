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
    changeView: false,
    perPageSelect: {
      isShow: false,
      perPage: 5,
    },
  };

  handlerChangeView = () => this.setState(({ changeView }) => ({
    changeView: !changeView,
  }));

  handlerWithInfoChange = () => this.setState(({ withInfo }) => ({
    withInfo: !withInfo,
  }));

  onPageChange = currentPage => this.setState({ currentPage });

  handlerDropdownToggle = () => this.setState(({ perPageSelect }) => ({
    perPageSelect: {
      isShow: !perPageSelect.isShow,
      perPage: perPageSelect.perPage,
    },
  }));

  handlerDropdownSelect = (e) => {
    this.setState({
      perPageSelect: {
        isShow: false,
        perPage: +e.target.dataset.value,
      },
    });
  };

  render() {
    const {
      perPageSelect, currentPage, withInfo, changeView,
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
              onClick={this.handlerDropdownToggle}
            >
              Pagination per page
            </button>
            <div
              className={classNames('dropdown-menu', {
                show: perPageSelect.isShow,
              })}
              aria-labelledby="dropdownMenuButton"
            >
              {perPageList.map(item => (
                <p
                  key={item}
                  className="dropdown-item"
                  data-value={item}
                  onClick={this.handlerDropdownSelect}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
          {/* EOF .dropdown */}

          <div className="form-check">
            <label className="form-check-label" htmlFor="exampleCheck1">
              Show extra info
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                checked={withInfo}
                onChange={this.handlerWithInfoChange}
              />
            </label>
          </div>
          {/* EOF withInfo */}

          <div className="form-check">
            <label className="form-check-label" htmlFor="change-view">
              Change view
              <input
                type="checkbox"
                className="form-check-input"
                id="change-view"
                checked={changeView}
                onChange={this.handlerChangeView}
              />
            </label>
          </div>
          {/* EOF change View */}
        </form>

        <Pagination
          total={42}
          perPage={perPageSelect.perPage}
          page={currentPage}
          onPageChange={this.onPageChange}
          withInfo={withInfo}
          changeView={changeView}
        />
      </div>
    );
  }
}

export default App;
