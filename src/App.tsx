import React from 'react';
import './App.css';
import { Pagination } from './components/Pagination';

export class App extends React.Component {
  state = {
    itemsPerPageOptions: [3, 5, 10, 20],
    perPage: 5,
    currentPage: 1,
    total: 42,
  };

  setItemsPerPage = (num:number) => {
    this.setState({
      perPage: num,
      currentPage: 1,
    });
  };

  handlePageChange = (page:number) => {
    this.setState({
      currentPage: page,
    });
  };

  render() {
    const {
      perPage,
      itemsPerPageOptions,
      currentPage,
      total,
    } = this.state;

    return (
      <div className="container">
        <h1>Items with Pagination</h1>

        <p className="lead" data-cy="info">
          {`Page ${currentPage} (items ${(perPage * (currentPage - 1)) + 1} - ${currentPage * perPage > total ? total : currentPage * perPage} of ${total})`}
        </p>

        <div className="form-group row">
          <div className="col-3 col-sm-2 col-xl-1">
            <select
              data-cy="perPageSelector"
              id="perPageSelector"
              className="form-control"
              value={perPage}
              onChange={event => {
                this.setItemsPerPage(+event.target.value);
              }}
            >

              {itemsPerPageOptions.map(item => (
                <option value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <label htmlFor="perPageSelector" className="col-form-label col">
            items per page
          </label>
        </div>
        <Pagination
          total={total}
          perPage={perPage}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}
export default App;
