import React, { PureComponent } from 'react';
import './App.css';
import Pagination from './components/Pagination/Pagination';

const optionToChoseItemsCountPerPage = [3, 5, 10, 20];

class App extends PureComponent {
  state = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 42,
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

  changeItemsCount = (e) => {
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
            onChange={this.changeItemsCount}
          />
        </label>

        <label>
          set number of items per page
          <select
            name="itemsPerPage"
            value={itemsPerPage}
            onChange={this.changeItemsCount}
            className="form-control"
          >
            {optionToChoseItemsCountPerPage.map(itemsCount => (
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
