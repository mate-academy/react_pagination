import React from 'react';
import './App.css';

import Buttons from './Buttons';
import Select from './Select';
import List from './List';

const content = new Array(42)
  .fill(0).map((el, i) => `${i + 1}`);

class App extends React.Component {
  state = {
    total: content.length,
    perPage: 5,
    page: 1,
  }

  changePerPage = (event) => {
    this.setState({
      perPage: event.target.value, page: 1,
    });
  }

  changeCurrentButton = (button) => {
    this.setState({ page: button });
  }

  changePage = (direction) => {
    this.setState(state => ({ page: state.page + direction }));
  }

  drawButtons = (count) => {
    const { page } = this.state;

    return new Array(count)
      .fill(0).map((el, i) => {
        const idx = i + 1;

        if (idx === 1
          || idx === page - 1
          || idx === page
          || idx === page + 1
          || idx === count) {
          return i + 1;
        }

        return 'dot';
      });
  }

  render() {
    const { total, perPage, page } = this.state;

    return (
      <div className="container">
        <h1>
          Showing from
          {' '}
          {page - 1 === 0
            ? 1
            : (page - 1) * perPage + 1}
          {' '}
          to
          {' '}
          {perPage * page > total
            ? total
            : perPage * page}
          {' '}
          of
          {' '}
          {total}
        </h1>
        <List
          page={page}
          perPage={perPage}
          content={content}
        />
        <Select
          perPage={perPage}
          changePerPage={this.changePerPage}
        />
        <Buttons
          page={page}
          changePage={this.changePage}
          changeCurrentButton={this.changeCurrentButton}
          perPage={perPage}
          total={total}
          drawButtons={this.drawButtons}
        />

      </div>
    );
  }
}

export default App;
