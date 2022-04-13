import React from 'react';
import { Pagination } from './components/Pagination';
import './App.scss';

type Props = {};

type State = {
  total: number;
  page: number;
};

export class App extends React.PureComponent<Props, State> {
  state = {
    total: 42,
    page: 1,
  };

  setPage = (event: React.MouseEvent) => {
    if (event.currentTarget.textContent) {
      const value = +event.currentTarget.textContent;

      if (!Number.isNaN(value)) {
        this.setState({ page: value });
      }
    }
  };

  nextPage = () => {
    this.setState(state => ({
      page: state.page + 1,
    }));
  };

  prevPage = () => {
    this.setState(state => ({
      page: state.page - 1,
    }));
  };

  render() {
    const { total, page } = this.state;

    return (
      <div className="App">
        <div className="App__content">
          <h1 className="App__title">
            Pagination
          </h1>
          <Pagination
            total={total}
            page={page}
            setPage={this.setPage}
            prev={this.prevPage}
            next={this.nextPage}
          />
        </div>
      </div>
    );
  }
}
