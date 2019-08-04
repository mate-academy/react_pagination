import React from 'react';

import posts from './posts';
import Pagination from './Pagination';
import './App.css';

class App extends React.Component {
  state = {
   page: 0,
   perPage: 10,
   total: posts.length,
   pageNull: 0,
  };

  handlePageChange = (currentPage) => {
  this.setState({
    page: currentPage,
    })
  };

  handleHitsChange =({target: {value}}) => {
    this.setState({
      perPage: +value,
    })
  };

  render() {
    const {page, perPage, total} = this.state;
    const firstPosition = page * perPage;
    const lastPosition = page * perPage + perPage;
    return (
      <div className="App">
        <h1>Page {page+1}</h1>
        <form>
          <select onChange={this.handleHitsChange} className="select" >
            <option value="" style={{display: 'none'}}>per page</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </form>
        {posts.slice(firstPosition, lastPosition).map(post =>
          <li
            key={post.id}
          >
            {post.title}
          </li>
          )
        }
        <Pagination
          page={page}
          perPage={perPage}
          total={total}
          handlePageChange={this.handlePageChange}
        />
      </div>
    );
  }
};

export default App;
