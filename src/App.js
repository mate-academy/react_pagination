import React, { PureComponent } from 'react';
import { Pagination } from './components/Pagination/Pagination';
import './App.css';

class App extends PureComponent {
  state = {
    page: 1,
    total: 42,
  }

  handleChange = ({ target }) => {
    const btnType = target.getAttribute('data-name');
    const { page } = this.state;

    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(btnType)) {
      this.updatePage(Number(btnType));
    } else {
      switch (btnType) {
        case 'next':
          this.updatePage(page + 1);
          break;
        case 'prev':
          this.updatePage(page - 1);
          break;
        default: break;
      }
    }
  }

  updatePage = (number) => {
    this.setState({
      page: number,
    });
  }

  render() {
    const { page, total } = this.state;

    return (
      <Pagination
        total={total}
        page={page}
        onClick={this.handleChange}
      />
    );
  }
}

export default App;
