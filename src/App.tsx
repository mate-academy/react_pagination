import React from 'react';
import './App.scss';
import { Pagination } from './Pagination';

type State = {
  total: number,
  perPage: number,
  page: number,
};

export class App extends React.Component<{}, State> {
  state: State = {
    total: 42,
    perPage: 5,
    page: 1,
  };

  onPageChange = (page: number) => {
    this.setState({ page });
  };

  changePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      perPage: +event.target.value,
      page: 1,
    });
  };

  nextButton = () => {
    this.setState((state) => ({
      page: state.page + 1,
    }));
  };

  prevButton = () => {
    this.setState((state) => ({
      page: state.page - 1,
    }));
  };

  render() {
    const {
      total,
      perPage,
      page,
    } = this.state;

    return (
      <>
        <h1>Pagination</h1>

        <div>
          <label htmlFor="perPage">
            Items per page&nbsp;
            <select
              id="perPage"
              value={perPage}
              onChange={this.changePerPage}
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>

        <div>
          <Pagination
            total={total}
            perPage={perPage}
            page={page}
            onPageChange={this.onPageChange}
            onClickNextButton={this.nextButton}
            onclickPrevButton={this.prevButton}
          />
        </div>
      </>
    );
  }
}
