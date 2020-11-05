import React from 'react';
import './app.scss';
import { Pagination } from './components/Pagination/Pagination';

const perPageOptions = [3, 5, 10, 20, 50];

class App extends React.PureComponent {
  state = {
    currentPage: 9,
    perPage: 5,
    total: 42,
  }

  onPerPageChange = (event) => {
    this.setState({
      perPage: +event.target.value,
      currentPage: 1,
    });
  }

  onPageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  }

  moveToNextPage = () => {
    this.setState(state => ({
      currentPage: state.currentPage + 1,
    }));
  }

  moveToPrevPage = () => {
    this.setState(state => ({
      currentPage: state.currentPage - 1,
    }));
  }

  render() {
    const { currentPage, perPage: perPageItems, total } = this.state;

    return (
      <div className="app">
        <label>
          <span className="is-size-5">{`Number of items per page: `}</span>
          <div className="select is-info">
            <select
              value={perPageItems}
              onChange={this.onPerPageChange}
            >
              {
                perPageOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))
              }
            </select>
          </div>
        </label>

        <Pagination
          total={total}
          perPageItems={perPageItems}
          currentPage={currentPage}
          onPage={this.onPageChange}
          onPrev={this.moveToPrevPage}
          onNext={this.moveToNextPage}
          withInfo
        />
      </div>
    );
  }
}

export default App;
