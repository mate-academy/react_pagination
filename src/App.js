import React from 'react';
import './App.css';

import Buttons from './Buttons';
import Select from './Select';
import List from './List';

class App extends React.Component {
  state = {
    total: 42,
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

  render() {
    const { total, perPage, page } = this.state;
    const content = new Array(total)
      .fill(0).map((el, i) => `${i + 1}`);
    const choosePerPage = [5, 10, 15, 20];
    const buttonCount = new Array(Math.ceil(total / perPage))
      .fill(0).map((el, i) => i + 1);
    const currentContent = content.splice((page - 1) * perPage, perPage);

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
        <List currentContent={currentContent} />
        <Select
          perPage={perPage}
          changePerPage={this.changePerPage}
          choosePerPage={choosePerPage}
        />
        <Buttons
          buttonCount={buttonCount}
          page={page}
          changePage={this.changePage}
          changeCurrentButton={this.changeCurrentButton}
        />

      </div>
    );
  }
}

export default App;
