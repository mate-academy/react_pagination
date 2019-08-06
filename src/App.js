import React from 'react';
import './App.css';

import getData from './api/getData';
import PostList from './components/PostList';
import Pagination from './components/Pagination';

class App extends React.Component {
  state = {
    posts: [],
    postsAmmount: 0,
    currentPage: 0,
    postsPerPage: 5,
  }

  async componentDidMount() {
    this.loadData();
  }

  loadData = async() => {
    const posts = await getData();

    this.setState({
      posts,
      postsAmmount: posts.length,
    });
  }

  changeCurrentPage = (currentPage) => {
    this.setState({ currentPage });
  }

  changePerPageAmmount = (event) => {
    const { value } = event.target;

    this.setState({
      postsPerPage: +value,
      currentPage: 0,
    });
  }

  render() {
    const {
      posts,
      currentPage,
      postsPerPage,
      postsAmmount,
    } = this.state;

    const firstIndex = currentPage * postsPerPage;
    const lastIndex = currentPage * postsPerPage + postsPerPage;

    return (
      <div className="App">
        <h1>Dynamic list of posts</h1>

        <div className="pagination">
          <select
            onChange={this.changePerPageAmmount}
            className="pagination__posts-ammount"
          >
            <option value={0}>Posts Ammount</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>

          <Pagination
            currentPage={currentPage}
            perPage={postsPerPage}
            postsAmmount={postsAmmount}
            changeCurrentPage={this.changeCurrentPage}
          />

        </div>

        <div className="with-info">
          {`${firstIndex + 1} - ${lastIndex <= postsAmmount
            ? lastIndex
            : postsAmmount
          } of ${postsAmmount} posts`}
        </div>

        <PostList
          posts={posts.slice(firstIndex, lastIndex)}
        />
      </div>
    );
  }
}

export default App;
