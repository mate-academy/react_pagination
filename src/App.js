import React from 'react';
import Pagination from './Components/Pagination/Pagination';
import PaginationSettings from './Components/Pagination/PaginationSettings';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const pages = new Array(99).fill(0).map((page, i) => i + 1);

class App extends React.Component {
  state = {
    page: 1,
    perPage: 12,
    total: pages.length,
  };

  setPage(newPage) {
    const { page, perPage, total } = this.state;

    if (
      newPage === page
      || newPage < 1
      || newPage > Math.ceil(total / perPage)
    ) {
      return;
    }

    this.setState({ page: newPage });
  }

  onPageChange = (page) => {
    this.setPage(page);
  }

  handlePerPageQty = (value) => {
    if (value < 0 || value > 21) {
      return;
    }

    this.setState({ perPage: +value });
  }

  render() {
    const { perPage, page } = this.state;
    const firstVisibleIndex = ((page - 1) * perPage) + 1;

    return (
      <div className="app">
        <h1>Pagination</h1>
        <PaginationSettings
          value={perPage}
          handlePerPageQty={this.handlePerPageQty}
        />
        <ul className="content">
          {pages.slice(firstVisibleIndex - 1, firstVisibleIndex + perPage - 1)
            .map(item => (
              <li key={item} className="content__block">{item}</li>
            ))}
        </ul>
        <div className="content__pagination">
          <Pagination
            total={pages.length}
            perPage={perPage}
            page={page}
            onPageChange={this.onPageChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
