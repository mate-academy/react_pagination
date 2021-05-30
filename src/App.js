import React from 'react';
import { Pagination } from './components/Pagination';

import './App.scss';

class App extends React.PureComponent {
  state = {
    selectedPage: 1,
    perPage: 5,
  }

  changePage = pageNumber => (
    // eslint-disable-next-line consistent-return
    this.setState((state) => {
      if (pageNumber !== state.selectedPage) {
        return {
          selectedPage: pageNumber,
        };
      }
    })
  )

  onPerPageChange = (event) => {
    const value = +event.target.value;

    return this.setState({
      selectedPage: 1,
      perPage: value,
    });
  }

  render() {
    const {
      selectedPage,
      perPage,
    } = this.state;

    return (
      <>
        <select
          name="per-page"
          value={perPage}
          onChange={this.onPerPageChange}
        >
          <option value="3">
            3
          </option>

          <option value="5">
            5
          </option>

          <option value="10">
            10
          </option>

          <option value="20">
            20
          </option>
        </select>

        <Pagination
          total={42}
          page={selectedPage}
          perPage={perPage}
          onPageChange={this.changePage}
          withInfo
        />
      </>
    );
  }
}

export default App;
