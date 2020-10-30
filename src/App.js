import React from 'react';
import './app.scss';
import { Pagination } from './components/Pagination/Pagination';

const perPageOptions = [3, 5, 10, 20];

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

  nextPage = () => {
    this.setState(state => ({
      currentPage: state.currentPage + 1,
    }));
  }

  prevPage = () => {
    this.setState(state => ({
      currentPage: state.currentPage - 1,
    }));
  }

  render() {
    const { currentPage, perPage, total } = this.state;

    return (
      <div className="app">
        <label>
          <span className="is-size-5">{`Number of items per page: `}</span>
          <div className="select is-info">
            <select
              value={perPage}
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
          perPage={perPage}
          page={currentPage}
          onPage={this.onPageChange}
          onPrev={this.prevPage}
          onNext={this.nextPage}
          withInfo
        />
      </div>
    );
  }
}

export default App;
