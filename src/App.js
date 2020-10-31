import React, { PureComponent } from 'react';
import './App.css';
import Pagination from './components/Pagination/Pagination';

class App extends PureComponent {
  state = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 19,
  }

  changePage = (page) => {
    if (page === 'Previous' || page === 'Next') {
      this.setState(state => ({
        currentPage: page === 'Previous'
          ? state.currentPage - 1
          : state.currentPage + 1,
      }));

      return;
    }

    this.setState({
      currentPage: page,
    });
  }

  changeItemsPerPage = (e) => {
    const { value } = e.target;

    this.setState({
      currentPage: 1,
      itemsPerPage: +value,
    });
  }

  render() {
    const { currentPage, itemsPerPage, totalItems } = this.state;
    const firstItem = (currentPage - 1) * itemsPerPage + 1;
    const lastItem = Math.min((currentPage * itemsPerPage), totalItems);
    const info = `${firstItem} - ${lastItem} of ${totalItems}`;

    return (
      <div className="pl-3">
        <h1>{`Current Page ${currentPage}`}</h1>

        <label>
          set number of items per page
          <select
            value={itemsPerPage}
            onChange={this.changeItemsPerPage}
            className="form-control"
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>

        <Pagination
          onPageChange={this.changePage}
          currentPage={currentPage}
          perPage={itemsPerPage}
          totalItems={totalItems}
          withInfo={info}
        />
      </div>
    );
  }
}

export default App;
