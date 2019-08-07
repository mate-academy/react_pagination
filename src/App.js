import React from 'react';
import './App.css';
import posts from './components/posts';
import PostsComponent from './components/PostsComponent';
import Pagination from './components/Pagination';

class App extends React.Component {
  state = {
    page: 0,
    postsPerPage: 10,
    totalPostsCount: posts.length,
  };

  pageChange = (number) => {
    this.setState({
      page: number,
    });
  };

  render() {
    const { page, postsPerPage, totalPostsCount } = this.state;
    const indexOfFirstPost = page * postsPerPage;
    const indexOfLastPost = indexOfFirstPost + postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    return (
      <div className="App">
        <PostsComponent posts={currentPosts} />
        <Pagination
          page={page}
          postsPerPage={postsPerPage}
          totalPostsCount={totalPostsCount}
          handlePageChange={this.pageChange}
        />

      </div>
    );
  }
}

export default App;

/*
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
*/
