import React, { PureComponent } from 'react';
import './App.css';
import Pagination from './components/Pagination/Pagination';

const perPageSelectOptions = [3, 5, 10, 20];

class App extends PureComponent {
  state = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 42,
  }

  changePage = (page) => {
    this.setState({
      currentPage: page,
    });
  }

  moveToNextPage = () => {
    this.setState(state => ({
      currentPage: state.currentPage + 1,
    }));
  }

  moveToPrevPage = () => {
    this.setState(state => ({
      currentPage: state.currentPage - 1,
    }));
  }

  changeDefaultValues = (e) => {
    const { name, value } = e.target;

    this.setState({
      currentPage: 1,
      [name]: +value,
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
          Choose total items
          <input
            name="totalItems"
            className="form-control"
            type="number"
            value={totalItems}
            onChange={this.changeDefaultValues}
          />
        </label>

        <label>
          set number of items per page
          <select
            name="itemsPerPage"
            value={itemsPerPage}
            onChange={this.changeDefaultValues}
            className="form-control"
          >
            {perPageSelectOptions.map(itemsCount => (
              <option
                key={itemsCount}
                value={itemsCount}
              >
                {itemsCount}
              </option>
            ))}
          </select>
        </label>

        <Pagination
          onPageChange={this.changePage}
          onMoveToNextPage={this.moveToNextPage}
          onMoveToPrevPage={this.moveToPrevPage}
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
