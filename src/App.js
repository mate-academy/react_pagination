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
    perPageSelect: {
      isShow: false,
      perPage: 5,
    },
  };

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
    const { perPageSelect, currentPage, withInfo } = this.state;

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
        </form>

        <Pagination
          total={42}
          perPage={perPageSelect.perPage}
          page={currentPage}
          onPageChange={this.onPageChange}
          withInfo={withInfo}
        />
      </div>
    );
  }
}

export default App;
