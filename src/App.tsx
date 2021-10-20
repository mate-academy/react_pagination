import React from 'react';
import './App.css';
import classNames from 'classnames';
import { Pagination } from './Pagination';

export class App extends React.Component<{}, {}> {
  state = {
    total: 42,
    perPage: 3,
    page: 1,
  };

  changePage = (value: number) => {
    this.setState({ page: value });
  };

  title = () => {
    const { total, page, perPage } = this.state;

    return `${(perPage * page) - (perPage - 1)} - ${(perPage * page > total) ? total : perPage * page} of ${total}`;
  };

  render() {
    const { total, perPage } = this.state;
    let { page } = this.state;

    return (
      <>
        Count:
        {'   '}
        <select
          value={perPage}
          onChange={
            event => {
              this.setState({
                perPage: event.currentTarget.value,
                page: 1,
              });
            }
          }
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <div className="title">
          {
            this.title()
          }

        </div>

        <div className="box">
          <button
            type="button"
            className={classNames({ disabled: page === 1 }, 'btn btn-outline-primary')}
            onClick={() => {
              this.setState({ page: page -= 1 });
            }}
          >
            prew

          </button>
          <Pagination
            total={total}
            perPage={perPage}
            page={page}
            changePage={this.changePage}
          />

          <button
            type="button"
            className={classNames({ disabled: page === Math.ceil(total / perPage) }, 'btn btn-outline-primary')}
            onClick={() => {
              this.setState({ page: page += 1 });
            }}
          >
            next

          </button>
        </div>

      </>
    );
  }
}
