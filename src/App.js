import React, { Component } from 'react';
import './App.css';
import Pagination from './Pagination/Pagination';

class App extends Component {
  state = {
    total: 42,
    perPage: 5,
    page: 1,
  }

  onPageChange = (pageId) => {
    const { total, perPage } = this.state;
    const pagesTotal = Math.ceil(total / perPage);
    let page = pageId;

    if (pageId < 1) {
      page = 1;
    }

    if (pageId > pagesTotal) {
      page = pagesTotal;
    }

    this.setState({ page });
  }

  handleTotal = (e) => {
    let total = +e.target.value;

    if (total < 1) {
      total = 1;
    }

    this.setState({ total });
  }

  handlePerPage = (e) => {
    const { total } = this.state;
    let perPage = +e.target.value;

    if (perPage > total) {
      perPage = total;
    }

    if (perPage < 1) {
      perPage = 1;
    }

    this.setState({ perPage });
  }

  handlePage = (e) => {
    const { total, perPage } = this.state;
    let page = +e.target.value;
    const pagesTotal = Math.ceil(total / perPage);

    if (page < 1) {
      page = 1;
    }

    if (page > pagesTotal) {
      page = pagesTotal;
    }

    this.setState({ page });
  }

  render() {
    const { total, perPage, page } = this.state;
    const elements = [];

    for (let i = 1; i <= total; i += 1) {
      elements.push({
        id: i,
        content: `Element  #${i}`,
      });
    }

    return (
      <>
        <h2>Settings</h2>
        <label>
          <span className="app__input-title">
            Elements amount
          </span>
          <input
            className="app__input"
            value={total}
            type="number"
            onChange={this.handleTotal}
          />
        </label>
        <label>
          <span className="app__input-title">
            Elements per page
          </span>
          <input
            className="app__input"
            value={perPage}
            type="number"
            onChange={this.handlePerPage}
          />
        </label>
        <label>
          <span className="app__input-title">
            Set page
          </span>
          <input
            className="app__input"
            value={page}
            type="number"
            onChange={this.handlePage}
          />
        </label>
        <h1>
          Current page #
          {this.state.page}
        </h1>
        <h3>
          Elements (
          {(page * perPage) - perPage + 1}
          {' '}
          -
          {' '}
          {page * perPage}
          )
        </h3>
        <div className="app__element-list">
          {elements.map(({ id, content }) => {
            if (id >= (page * perPage) - perPage + 1 && id <= page * perPage) {
              return (
                <div
                  key={id}
                  className="app__element-item"
                >
                  {content}
                </div>
              );
            }

            return false;
          })}
        </div>
        <Pagination
          total={total}
          perPage={perPage}
          page={page}
          onPageChange={this.onPageChange}
        />
      </>
    );
  }
}

export default App;
